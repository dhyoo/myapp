/**
 * 넥스크로 프로젝트 타입 정의
 */

// 넥스크로 컴포넌트 타입
export type NexacroComponentType =
  | 'Form'
  | 'Container'
  | 'Grid'
  | 'Edit'
  | 'Button'
  | 'Combo'
  | 'CheckBox'
  | 'Radio'
  | 'Static'
  | 'Tab'
  | 'Div'
  | 'Image'
  | 'TreeView'
  | 'ListBox'
  | 'Calendar';

// 넥스크로 컴포넌트 속성
export interface NexacroComponent {
  id: string;
  type: NexacroComponentType;
  properties: Record<string, any>;
  events?: Record<string, string>; // 이벤트 핸들러 함수명
  children?: NexacroComponent[];
}

// 넥스크로 프로젝트 구조
export interface NexacroProject {
  name: string;
  forms: NexacroForm[];
  scripts?: Record<string, string>; // JS 파일들
}

// 넥스크로 Form
export interface NexacroForm {
  id: string;
  name: string;
  properties: Record<string, any>;
  components: NexacroComponent[];
}

// XADL 파일 구조
export interface XADLFile {
  version: string;
  application: {
    name: string;
    forms: XADLForm[];
  };
}

export interface XADLForm {
  id: string;
  name: string;
  properties: Record<string, any>;
  components: XADLComponent[];
}

export interface XADLComponent {
  id: string;
  type: string;
  properties: Record<string, any>;
  events?: XADLEvent[];
  children?: XADLComponent[];
}

export interface XADLEvent {
  id: string;
  handler: string;
}

// 변환 결과
export interface ConversionResult {
  success: boolean;
  reactComponents: ReactComponent[];
  errors?: ConversionError[];
  warnings?: string[];
}

export interface ReactComponent {
  name: string;
  filePath: string;
  code: string;
  imports: string[];
  dependencies: string[];
}

export interface ConversionError {
  componentId?: string;
  message: string;
  line?: number;
  column?: number;
}

// 컴포넌트 매핑 규칙
export interface ComponentMapping {
  nexacroType: NexacroComponentType;
  reactComponent: string;
  propsMapping: Record<string, string>; // 넥스크로 속성 -> React props
  defaultProps?: Record<string, any>;
  eventMapping?: Record<string, string>; // 넥스크로 이벤트 -> React 이벤트
}

