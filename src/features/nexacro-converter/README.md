# 넥스크로 → React 변환기

넥스크로 프로젝트를 React 프로젝트로 자동 변환하는 도구입니다.

## 🎯 주요 기능

- ✅ **XADL 파일 파싱**: 넥스크로 프로젝트의 XADL 파일을 분석하여 구조화
- ✅ **JavaScript 파일 파싱**: 넥스크로 이벤트 핸들러 함수 추출
- ✅ **컴포넌트 매핑**: 넥스크로 컴포넌트를 React 컴포넌트로 자동 매핑
- ✅ **이벤트 변환**: 넥스크로 이벤트를 React 이벤트로 변환
- ✅ **코드 생성**: 변환된 React 컴포넌트 코드 자동 생성
- ✅ **대시보드 UI**: 웹 기반 변환 도구 제공

## 📋 지원하는 넥스크로 컴포넌트

| 넥스크로 | React | 상태 |
|---------|-------|------|
| Form | div | ✅ |
| Container | div | ✅ |
| Grid | DataGrid | ✅ |
| Edit | input | ✅ |
| Button | button | ✅ |
| Combo | select | ✅ |
| CheckBox | input[type="checkbox"] | ✅ |
| Radio | input[type="radio"] | ✅ |
| Static | label | ✅ |
| Tab | Tabs | ✅ |
| Div | div | ✅ |
| Image | img | ✅ |
| TreeView | TreeView | ✅ |
| ListBox | select | ✅ |
| Calendar | input[type="date"] | ✅ |

## 🚀 사용 방법

### 1. 웹 대시보드 접속

브라우저에서 `/nexacro-converter` 경로로 접속합니다.

### 2. 파일 업로드

- **XADL 파일**: 넥스크로 프로젝트의 `.xadl` 파일을 업로드합니다.
- **JavaScript 파일**: 넥스크로 프로젝트의 `.js` 파일을 업로드합니다.

### 3. 변환 실행

"변환 시작" 버튼을 클릭하여 변환을 시작합니다.

### 4. 결과 확인 및 다운로드

변환된 React 컴포넌트 코드를 확인하고 필요한 파일을 다운로드합니다.

## 📁 프로젝트 구조

```
src/features/nexacro-converter/
├── types/
│   └── nexacro.types.ts          # 타입 정의
├── utils/
│   ├── parser.ts                 # 파일 파서
│   ├── converter.ts              # 변환 로직
│   └── componentMappings.ts      # 컴포넌트 매핑 규칙
├── components/
│   └── ConverterDashboard.tsx   # 대시보드 UI
├── index.ts                      # 모듈 export
└── README.md                     # 문서
```

## 🔧 컴포넌트 매핑 규칙

각 넥스크로 컴포넌트는 다음과 같은 규칙으로 React 컴포넌트로 변환됩니다:

### 속성 매핑

- `width` → `width`
- `height` → `height`
- `text` → `children` (일부 컴포넌트)
- `value` → `value`
- `enabled` → `disabled` (반대 값)
- `visible` → `style.display`

### 이벤트 매핑

- `onclick` → `onClick`
- `onchanged` → `onChange`
- `onfocus` → `onFocus`
- `onblur` → `onBlur`
- `oncellclick` → `onCellClick`
- `onrowchanged` → `onRowChanged`

## 📝 변환 예시

### 넥스크로 코드

```javascript
// XADL
<Form id="MainForm" name="MainForm">
  <Component id="btnSave" type="Button" text="저장" />
  <Component id="txtName" type="Edit" value="" />
</Form>

// JavaScript
function this.btnSave_click(obj:Button, e:nexacro.ClickEventInfo) {
  this.txtName.set_text("Hello");
}
```

### 변환된 React 코드

```tsx
import React from 'react';

interface MainFormProps {
  // TODO: Props 타입 정의
}

const MainForm: React.FC<MainFormProps> = (props) => {
  const handleBtnSaveClick = (e: React.SyntheticEvent) => {
    // this.txtName.set_text("Hello");
    // TODO: React 스타일로 변환 필요
  };

  return (
    <div>
      <button id="btnSave" onClick={handleBtnSaveClick}>저장</button>
      <input id="txtName" type="text" value="" />
    </div>
  );
};

export default MainForm;
```

## ⚠️ 주의사항

1. **완전 자동 변환 불가**: 일부 복잡한 로직은 수동으로 수정이 필요할 수 있습니다.
2. **커스텀 컴포넌트**: 넥스크로의 커스텀 컴포넌트는 기본 매핑이 제공되지 않습니다.
3. **서버 연동**: 넥스크로의 서버 연동 코드는 별도로 변환해야 합니다.
4. **스타일링**: CSS 스타일은 기본적으로 변환되지만, 프로젝트에 맞게 조정이 필요합니다.

## 🔮 향후 개선 사항

- [ ] 더 많은 넥스크로 컴포넌트 지원
- [ ] 서버 연동 코드 변환 기능
- [ ] 스타일 자동 변환 개선
- [ ] 변환 규칙 커스터마이징 기능
- [ ] 배치 변환 기능
- [ ] 변환 전/후 비교 기능

## 📚 참고 자료

- [넥스크로 공식 문서](https://support.nexacro.com/)
- [React 공식 문서](https://react.dev/)

