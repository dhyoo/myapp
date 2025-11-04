/**
 * 넥스크로 컴포넌트를 React 컴포넌트로 변환
 */
import type {
  NexacroComponent,
  ReactComponent,
  ConversionResult,
  ConversionError,
  NexacroProject,
} from '../types/nexacro.types';
import { findMapping } from './componentMappings';
import { parseNexacroJS } from './parser';

/**
 * 넥스크로 프로젝트를 React 프로젝트로 변환
 */
export function convertNexacroToReact(
  project: NexacroProject,
  options: ConversionOptions = {}
): ConversionResult {
  const errors: ConversionError[] = [];
  const warnings: string[] = [];
  const reactComponents: ReactComponent[] = [];

  // JS 파일에서 이벤트 핸들러 함수 추출
  const eventHandlers: Record<string, string> = {};
  if (project.scripts) {
    Object.values(project.scripts).forEach((script) => {
      const handlers = parseNexacroJS(script);
      Object.assign(eventHandlers, handlers);
    });
  }

  // 각 Form을 React 컴포넌트로 변환
  project.forms.forEach((form) => {
    try {
      const reactComponent = convertFormToReact(form, eventHandlers, options);
      reactComponents.push(reactComponent);
    } catch (error) {
      errors.push({
        componentId: form.id,
        message: error instanceof Error ? error.message : String(error),
      });
    }
  });

  return {
    success: errors.length === 0,
    reactComponents,
    errors: errors.length > 0 ? errors : undefined,
    warnings: warnings.length > 0 ? warnings : undefined,
  };
}

/**
 * Form을 React 컴포넌트로 변환
 */
function convertFormToReact(
  form: any,
  eventHandlers: Record<string, string>,
  _options: ConversionOptions
): ReactComponent {
  const componentName = toPascalCase(form.name || form.id);
  const imports = new Set<string>(['React']);
  const dependencies = new Set<string>();
  
  let code = '';
  let childrenCode = '';

  // Form의 자식 컴포넌트들을 변환
  if (form.components && form.components.length > 0) {
    form.components.forEach((component: NexacroComponent) => {
      const converted = convertComponent(component, eventHandlers, imports, dependencies);
      childrenCode += converted;
    });
  }

  // React 컴포넌트 코드 생성
  code = generateReactComponent(
    componentName,
    form.properties,
    childrenCode,
    Array.from(imports),
    eventHandlers
  );

  return {
    name: componentName,
    filePath: `src/components/${componentName}.tsx`,
    code,
    imports: Array.from(imports),
    dependencies: Array.from(dependencies),
  };
}

/**
 * 넥스크로 컴포넌트를 React JSX로 변환
 */
function convertComponent(
  component: NexacroComponent,
  eventHandlers: Record<string, string>,
  imports: Set<string>,
  dependencies: Set<string>
): string {
  const mapping = findMapping(component.type);

  if (!mapping) {
    console.warn(`매핑 규칙을 찾을 수 없습니다: ${component.type}`);
    return `{/* 변환 불가: ${component.type} */}\n`;
  }

  const reactComponent = mapping.reactComponent;
  const props = convertProperties(component.properties, mapping, component.events, eventHandlers);

  // 커스텀 컴포넌트인 경우 import 추가
  if (reactComponent !== 'div' && reactComponent !== 'input' && reactComponent !== 'button' && 
      reactComponent !== 'select' && reactComponent !== 'label' && reactComponent !== 'img') {
    imports.add(reactComponent);
    dependencies.add(reactComponent.toLowerCase());
  }

  // 자식 컴포넌트 변환
  let children = '';
  if (component.children && component.children.length > 0) {
    children = component.children
      .map((child) => convertComponent(child, eventHandlers, imports, dependencies))
      .join('\n');
  }

  // JSX 생성
  const propsString = Object.entries(props)
    .map(([key, value]) => {
      if (key === 'children' && typeof value === 'string') {
        return value;
      }
      if (typeof value === 'string') {
        return `${key}="${value}"`;
      }
      if (typeof value === 'boolean') {
        return value ? key : `${key}={false}`;
      }
      if (typeof value === 'number') {
        return `${key}={${value}}`;
      }
      if (typeof value === 'object') {
        return `${key}={${JSON.stringify(value)}}`;
      }
      return `${key}={${value}}`;
    })
    .join(' ');

  if (children) {
    return `<${reactComponent} ${propsString}>\n${children}\n</${reactComponent}>`;
  } else {
    return `<${reactComponent} ${propsString} />`;
  }
}

/**
 * 넥스크로 속성을 React props로 변환
 */
function convertProperties(
  properties: Record<string, any>,
  mapping: any,
  events?: Record<string, string>,
  eventHandlers?: Record<string, string>
): Record<string, any> {
  const props: Record<string, any> = {};

  // 기본 속성 매핑
  Object.entries(properties).forEach(([key, value]) => {
    const mappedKey = mapping.propsMapping[key];
    if (mappedKey) {
      if (mappedKey === 'style.display') {
        props.style = { ...props.style, display: value ? 'block' : 'none' };
      } else if (mappedKey === 'disabled' && typeof value === 'boolean') {
        props.disabled = !value; // enabled의 반대
      } else {
        props[mappedKey] = value;
      }
    }
  });

  // 기본 props 추가
  if (mapping.defaultProps) {
    Object.assign(props, mapping.defaultProps);
  }

  // 이벤트 핸들러 매핑
  if (events && mapping.eventMapping) {
    Object.entries(events).forEach(([nexacroEvent, handlerName]) => {
      const reactEvent = mapping.eventMapping[nexacroEvent];
      if (reactEvent && eventHandlers && eventHandlers[handlerName]) {
        // 이벤트 핸들러를 React 스타일로 변환
        props[reactEvent] = convertEventHandler(eventHandlers[handlerName]);
      } else if (reactEvent) {
        props[reactEvent] = `handle${toPascalCase(handlerName)}`;
      }
    });
  }

  return props;
}

/**
 * 넥스크로 이벤트 핸들러를 React 이벤트 핸들러로 변환
 */
function convertEventHandler(handlerCode: string): string {
  // 간단한 변환: 넥스크로 스타일을 React 스타일로 변경
  // 실제로는 더 복잡한 변환이 필요할 수 있음
  let converted = handlerCode
    .replace(/this\./g, '') // this. 제거
    .replace(/obj:/g, '') // 타입 어노테이션 제거
    .replace(/e:nexacro\.\w+EventInfo/g, 'e'); // 이벤트 타입을 e로 변경

  return `(${converted})`;
}

/**
 * React 컴포넌트 코드 생성
 */
function generateReactComponent(
  name: string,
  _properties: Record<string, any>,
  children: string,
  imports: string[],
  eventHandlers: Record<string, string>
): string {
  const importStatements = imports.map((imp) => `import ${imp} from '${imp}'`).join(';\n');

  // 이벤트 핸들러 함수들 생성
  const handlerFunctions = Object.entries(eventHandlers)
    .map(([name, code]) => {
      const handlerName = `handle${toPascalCase(name)}`;
      return `  const ${handlerName} = (e: React.SyntheticEvent) => {\n    ${code}\n  };`;
    })
    .join('\n\n');

  return `import React from 'react';\n${importStatements ? `\n${importStatements};` : ''}

interface ${name}Props {
  // TODO: Props 타입 정의
}

const ${name}: React.FC<${name}Props> = (props) => {
${handlerFunctions ? `${handlerFunctions}\n` : ''}
  return (
    <div>
${children.split('\n').map((line) => `      ${line}`).join('\n')}
    </div>
  );
};

export default ${name};
`;
}

/**
 * 문자열을 PascalCase로 변환
 */
function toPascalCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .split(/[_\s-]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
}

/**
 * 변환 옵션
 */
export interface ConversionOptions {
  outputFormat?: 'tsx' | 'jsx';
  useHooks?: boolean;
  useTypeScript?: boolean;
  customMappings?: Record<string, any>;
}

