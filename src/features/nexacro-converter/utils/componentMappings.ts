/**
 * 넥스크로 컴포넌트를 React 컴포넌트로 매핑하는 규칙
 */
import type { ComponentMapping, NexacroComponentType } from '../types/nexacro.types';

export const componentMappings: ComponentMapping[] = [
  {
    nexacroType: 'Form',
    reactComponent: 'div',
    propsMapping: {
      width: 'width',
      height: 'height',
      title: 'title',
      'background-color': 'backgroundColor',
    },
    defaultProps: {
      style: { width: '100%', height: '100%' },
    },
  },
  {
    nexacroType: 'Container',
    reactComponent: 'div',
    propsMapping: {
      width: 'width',
      height: 'height',
      'background-color': 'backgroundColor',
      visible: 'style.display', // visible: false -> display: 'none'
    },
  },
  {
    nexacroType: 'Grid',
    reactComponent: 'DataGrid',
    propsMapping: {
      id: 'id',
      width: 'width',
      height: 'height',
      'row-count': 'rowCount',
      'column-count': 'columnCount',
    },
    defaultProps: {
      data: [],
    },
    eventMapping: {
      oncellclick: 'onCellClick',
      onrowchanged: 'onRowChanged',
      oncellchanged: 'onCellChanged',
    },
  },
  {
    nexacroType: 'Edit',
    reactComponent: 'input',
    propsMapping: {
      id: 'id',
      width: 'width',
      height: 'height',
      value: 'value',
      text: 'value',
      readonly: 'readOnly',
      enabled: 'disabled', // 반대 (enabled=false -> disabled=true)
      placeholder: 'placeholder',
      type: 'type',
    },
    defaultProps: {
      type: 'text',
    },
    eventMapping: {
      onchanged: 'onChange',
      onfocus: 'onFocus',
      onblur: 'onBlur',
    },
  },
  {
    nexacroType: 'Button',
    reactComponent: 'button',
    propsMapping: {
      id: 'id',
      width: 'width',
      height: 'height',
      text: 'children',
      enabled: 'disabled', // 반대
      visible: 'style.display',
    },
    defaultProps: {
      type: 'button',
    },
    eventMapping: {
      onclick: 'onClick',
      onfocus: 'onFocus',
      onblur: 'onBlur',
    },
  },
  {
    nexacroType: 'Combo',
    reactComponent: 'select',
    propsMapping: {
      id: 'id',
      width: 'width',
      height: 'height',
      value: 'value',
      enabled: 'disabled', // 반대
    },
    eventMapping: {
      onchanged: 'onChange',
      onfocus: 'onFocus',
      onblur: 'onBlur',
    },
  },
  {
    nexacroType: 'CheckBox',
    reactComponent: 'input',
    propsMapping: {
      id: 'id',
      text: 'children',
      checked: 'checked',
      enabled: 'disabled', // 반대
    },
    defaultProps: {
      type: 'checkbox',
    },
    eventMapping: {
      onchanged: 'onChange',
      onclick: 'onClick',
    },
  },
  {
    nexacroType: 'Radio',
    reactComponent: 'input',
    propsMapping: {
      id: 'id',
      text: 'children',
      checked: 'checked',
      value: 'value',
      enabled: 'disabled', // 반대
    },
    defaultProps: {
      type: 'radio',
    },
    eventMapping: {
      onchanged: 'onChange',
      onclick: 'onClick',
    },
  },
  {
    nexacroType: 'Static',
    reactComponent: 'label',
    propsMapping: {
      id: 'id',
      text: 'children',
      width: 'width',
      height: 'height',
      'text-align': 'style.textAlign',
    },
  },
  {
    nexacroType: 'Tab',
    reactComponent: 'Tabs',
    propsMapping: {
      id: 'id',
      width: 'width',
      height: 'height',
      'tab-count': 'tabCount',
    },
    eventMapping: {
      ontabchanged: 'onTabChanged',
    },
  },
  {
    nexacroType: 'Div',
    reactComponent: 'div',
    propsMapping: {
      id: 'id',
      width: 'width',
      height: 'height',
      'background-color': 'backgroundColor',
      visible: 'style.display',
    },
  },
  {
    nexacroType: 'Image',
    reactComponent: 'img',
    propsMapping: {
      id: 'id',
      width: 'width',
      height: 'height',
      src: 'src',
      alt: 'alt',
    },
  },
  {
    nexacroType: 'TreeView',
    reactComponent: 'TreeView',
    propsMapping: {
      id: 'id',
      width: 'width',
      height: 'height',
      data: 'data',
    },
    eventMapping: {
      onitemclick: 'onItemClick',
      onitemchanged: 'onItemChanged',
    },
  },
  {
    nexacroType: 'ListBox',
    reactComponent: 'select',
    propsMapping: {
      id: 'id',
      width: 'width',
      height: 'height',
      'multiple': 'multiple',
      value: 'value',
    },
    defaultProps: {
      multiple: false,
    },
    eventMapping: {
      onchanged: 'onChange',
      onitemclick: 'onClick',
    },
  },
  {
    nexacroType: 'Calendar',
    reactComponent: 'input',
    propsMapping: {
      id: 'id',
      width: 'width',
      height: 'height',
      value: 'value',
      type: 'type',
    },
    defaultProps: {
      type: 'date',
    },
    eventMapping: {
      onchanged: 'onChange',
    },
  },
];

/**
 * 넥스크로 컴포넌트 타입에 맞는 매핑 규칙 찾기
 */
export function findMapping(nexacroType: NexacroComponentType): ComponentMapping | undefined {
  return componentMappings.find((mapping) => mapping.nexacroType === nexacroType);
}

/**
 * 모든 매핑 규칙 가져오기
 */
export function getAllMappings(): ComponentMapping[] {
  return componentMappings;
}

