/**
 * 넥스크로 프로젝트 파일 파서
 * XADL 파일과 JS 파일을 분석하여 구조화된 데이터로 변환
 */
import type { NexacroForm, NexacroComponent, NexacroProject } from '../types/nexacro.types';

/**
 * XADL 파일을 파싱하여 넥스크로 프로젝트 구조로 변환
 */
export function parseXADL(xadlContent: string): NexacroForm[] {
  try {
    // XADL은 XML 형식이므로 XML 파서를 사용해야 함
    // 여기서는 간단한 예시 구조를 제공
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xadlContent, 'text/xml');
    
    // 파싱 오류 확인
    const parseError = xmlDoc.querySelector('parsererror');
    if (parseError) {
      throw new Error(`XML 파싱 오류: ${parseError.textContent}`);
    }

    const forms: NexacroForm[] = [];
    const formElements = xmlDoc.querySelectorAll('Form');

    formElements.forEach((formEl) => {
      const form: NexacroForm = {
        id: formEl.getAttribute('id') || '',
        name: formEl.getAttribute('name') || '',
        properties: parseProperties(formEl),
        components: parseComponents(formEl),
      };
      forms.push(form);
    });

    return forms;
  } catch (error) {
    console.error('XADL 파싱 오류:', error);
    throw error;
  }
}

/**
 * 컴포넌트 속성 파싱
 */
function parseProperties(element: Element): Record<string, any> {
  const properties: Record<string, any> = {};
  const propElements = element.querySelectorAll('property');

  propElements.forEach((propEl) => {
    const name = propEl.getAttribute('name');
    const value = propEl.getAttribute('value') || propEl.textContent;
    if (name && value) {
      properties[name] = convertValue(value);
    }
  });

  return properties;
}

/**
 * 컴포넌트 파싱
 */
function parseComponents(element: Element): NexacroComponent[] {
  const components: NexacroComponent[] = [];
  const componentElements = element.querySelectorAll('Component');

  componentElements.forEach((compEl) => {
    const component: NexacroComponent = {
      id: compEl.getAttribute('id') || '',
      type: compEl.getAttribute('type') as any,
      properties: parseProperties(compEl),
      events: parseEvents(compEl),
      children: parseComponents(compEl),
    };
    components.push(component);
  });

  return components;
}

/**
 * 이벤트 파싱
 */
function parseEvents(element: Element): Record<string, string> | undefined {
  const events: Record<string, string> = {};
  const eventElements = element.querySelectorAll('event');

  if (eventElements.length === 0) {
    return undefined;
  }

  eventElements.forEach((eventEl) => {
    const name = eventEl.getAttribute('name');
    const handler = eventEl.getAttribute('handler') || eventEl.textContent;
    if (name && handler) {
      events[name] = handler;
    }
  });

  return Object.keys(events).length > 0 ? events : undefined;
}

/**
 * 값 변환 (문자열을 적절한 타입으로)
 */
function convertValue(value: string): any {
  // 불리언
  if (value === 'true' || value === 'false') {
    return value === 'true';
  }
  
  // 숫자
  if (/^-?\d+$/.test(value)) {
    return parseInt(value, 10);
  }
  
  if (/^-?\d*\.\d+$/.test(value)) {
    return parseFloat(value);
  }

  // 문자열
  return value;
}

/**
 * 넥스크로 JS 파일 파싱
 * 이벤트 핸들러 함수들을 추출
 */
export function parseNexacroJS(jsContent: string): Record<string, string> {
  const functions: Record<string, string> = {};
  
  // 함수 정의 패턴 찾기
  // 예: function this.Button_click(obj:Button, e:nexacro.ClickEventInfo) { ... }
  const functionPattern = /function\s+this\.(\w+)\s*\([^)]*\)\s*\{([\s\S]*?)\n\}/g;
  let match;

  while ((match = functionPattern.exec(jsContent)) !== null) {
    const functionName = match[1];
    const functionBody = match[2];
    functions[functionName] = functionBody.trim();
  }

  return functions;
}

/**
 * 넥스크로 프로젝트 파일들을 파싱하여 전체 프로젝트 구조 생성
 */
export function parseNexacroProject(
  xadlFiles: Record<string, string>,
  jsFiles: Record<string, string>
): NexacroProject {
  const forms: NexacroForm[] = [];
  const scripts: Record<string, string> = {};

  // XADL 파일들 파싱
  Object.entries(xadlFiles).forEach(([fileName, content]) => {
    try {
      const parsedForms = parseXADL(content);
      forms.push(...parsedForms);
    } catch (error) {
      console.error(`XADL 파일 파싱 실패: ${fileName}`, error);
    }
  });

  // JS 파일들 파싱
  Object.entries(jsFiles).forEach(([fileName, content]) => {
    scripts[fileName] = content;
  });

  return {
    name: 'NexacroProject',
    forms,
    scripts,
  };
}

