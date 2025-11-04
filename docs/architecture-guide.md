# 아키텍처 가이드

## 상태 관리 전략

### Zustand vs React Query 역할 분리

#### Zustand (클라이언트 상태)
- **용도**: UI 상태, 사용자 인터랙션 상태
- **예시**:
  - 메뉴 열림/닫힘 상태
  - 모달 열림/닫힘 상태
  - 필터 선택 상태
  - 폼 입력 상태
  - 테마/설정 상태

#### React Query (서버 상태)
- **용도**: 서버에서 가져온 데이터
- **예시**:
  - 사용자 목록
  - 활동 로그
  - 대시보드 통계
  - 역할 목록

### 권한 관리

`usePermission` 훅을 통해 권한 체크 로직을 통합 관리합니다.

```typescript
import { usePermission } from '@/shared/hooks/usePermission';

function MyComponent() {
  const { hasPermission, isAdmin } = usePermission();
  
  if (!hasPermission('WRITE')) {
    return <div>권한이 없습니다.</div>;
  }
  
  return <div>편집 가능</div>;
}
```

### 라우팅 구조

- `src/pages/`: 페이지 컴포넌트
- `src/app/routes/`: 라우트 정의 (lazy loading 포함)
- `src/shared/components/ProtectedRoute.tsx`: 권한 기반 라우트 보호

### 폴더 구조

```
src/
├── app/                    # 앱 설정
│   ├── components/         # 전역 컴포넌트 (ErrorBoundary 등)
│   ├── providers/          # Context Providers
│   └── routes/             # 라우트 정의
├── features/               # Feature-based 모듈
│   └── menu/              # 메뉴 기능
│       ├── components/     # 메뉴 관련 컴포넌트
│       ├── hooks/          # 메뉴 관련 hooks
│       ├── store/          # 메뉴 Zustand store
│       └── utils/          # 메뉴 유틸리티
├── pages/                  # 페이지 컴포넌트
│   ├── Dashboard/
│   ├── Users/
│   └── Roles/
└── shared/                 # 공통 코드
    ├── components/         # 공통 컴포넌트
    ├── hooks/              # 공통 hooks
    ├── utils/              # 유틸리티 함수
    └── types/              # TypeScript 타입
```


