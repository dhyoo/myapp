# CSS Modules 가이드

## 개요

컴포넌트의 긴 Tailwind className을 별도 CSS 파일로 분리하여 코드 가독성을 향상시켰습니다.

## 사용 방법

### 1. CSS 파일 생성

각 컴포넌트 폴더에 `ComponentName.module.css` 파일을 생성합니다.

```css
/* ComponentName.module.css */
.header {
  @apply flex items-center justify-between mb-6;
}

.title {
  @apply text-2xl font-bold text-gray-900;
}
```

### 2. 컴포넌트에서 사용

```tsx
import styles from './ComponentName.module.css';

export default function ComponentName() {
  return (
    <div className={styles.header}>
      <h1 className={styles.title}>제목</h1>
    </div>
  );
}
```

### 3. 조건부 클래스 (cn 유틸리티 사용)

여러 클래스를 조합하거나 조건부로 적용할 때는 `cn` 유틸리티를 사용합니다:

```tsx
import { cn } from '@/shared/utils/cn';
import styles from './ComponentName.module.css';

<div className={cn(styles.statIcon, styles.statIconBlue)}>
  {/* ... */}
</div>
```

## 장점

1. **가독성 향상**: 긴 className 문자열이 컴포넌트에서 제거되어 코드가 간결해집니다.
2. **재사용성**: 공통 스타일을 CSS 파일에서 한 번 정의하고 재사용할 수 있습니다.
3. **유지보수**: 스타일 변경 시 CSS 파일만 수정하면 됩니다.
4. **타입 안정성**: TypeScript가 CSS 클래스명을 자동완성하고 타입 체크합니다.

## 현재 적용된 컴포넌트

- ✅ `src/pages/Dashboard/DashboardPage.module.css`
- ✅ `src/shared/components/TopHeader.module.css`
- ✅ `src/shared/components/DashboardLayout.module.css`
- ✅ `src/shared/components/DataTable.module.css`

## 참고사항

- CSS Modules는 자동으로 클래스명을 해시하여 스코프를 격리합니다.
- `@apply` 디렉티브는 Tailwind CSS의 기능으로, PostCSS를 통해 처리됩니다.
- Vite는 CSS Modules와 Tailwind를 자동으로 지원합니다.

