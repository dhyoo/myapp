# Atomic Design + Feature-Based 디렉토리 구조

```
src/
├── app/                          # 앱 설정 및 전역 설정
│   ├── providers/
│   │   ├── QueryProvider.tsx     # React Query Provider
│   │   └── RouterProvider.tsx    # React Router Provider
│   ├── routes/
│   │   └── index.tsx             # 라우트 설정
│   └── store/
│       └── index.ts              # Zustand store 통합
│
├── features/                     # Feature-Based 구조 (도메인별)
│   ├── auth/
│   │   ├── components/
│   │   │   ├── LoginForm.tsx
│   │   │   └── LogoutButton.tsx
│   │   ├── hooks/
│   │   │   └── useAuth.ts
│   │   └── store/
│   │       └── authStore.ts
│   │
│   ├── menu/                     # 메뉴 관리 Feature
│   │   ├── components/
│   │   │   ├── MenuList.tsx
│   │   │   ├── MenuItem.tsx
│   │   │   └── Sidebar.tsx
│   │   ├── hooks/
│   │   │   ├── useMenus.ts       # React Query hook
│   │   │   └── useMenuFilter.ts  # 권한 필터링 hook
│   │   ├── store/
│   │   │   └── menuStore.ts      # Zustand store
│   │   ├── types/
│   │   │   └── menu.types.ts
│   │   └── utils/
│   │       └── menuFilter.ts     # 권한 필터링 로직
│   │
│   ├── users/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── store/
│   │
│   └── roles/
│       ├── components/
│       ├── hooks/
│       └── store/
│
├── shared/                       # 공통 컴포넌트 (Atomic Design)
│   ├── atoms/                    # 가장 작은 단위
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.test.tsx
│   │   │   └── index.ts
│   │   ├── Input/
│   │   ├── Icon/
│   │   └── Badge/
│   │
│   ├── molecules/                # Atoms 조합
│   │   ├── SearchBox/
│   │   │   ├── SearchBox.tsx
│   │   │   ├── SearchBox.test.tsx
│   │   │   └── index.ts
│   │   ├── FormField/
│   │   └── Card/
│   │
│   ├── organisms/                # Molecules 조합
│   │   ├── Header/
│   │   │   ├── Header.tsx
│   │   │   ├── Header.test.tsx
│   │   │   └── index.ts
│   │   ├── Sidebar/
│   │   └── DataTable/
│   │
│   ├── templates/                # 페이지 레이아웃
│   │   ├── DashboardLayout/
│   │   │   ├── DashboardLayout.tsx
│   │   │   └── index.ts
│   │   └── AuthLayout/
│   │
│   ├── hooks/                    # 공통 hooks
│   │   ├── useLocalStorage.ts
│   │   └── useDebounce.ts
│   │
│   ├── utils/                     # 유틸리티 함수
│   │   ├── api.ts                # API 클라이언트
│   │   ├── constants.ts
│   │   └── helpers.ts
│   │
│   └── types/                     # 공통 타입
│       └── common.types.ts
│
├── pages/                        # 페이지 컴포넌트
│   ├── Dashboard/
│   │   └── DashboardPage.tsx
│   ├── Users/
│   │   └── UsersPage.tsx
│   └── NotFound/
│       └── NotFoundPage.tsx
│
└── main.tsx
```

## 구조 설명

### Atomic Design 계층
- **Atoms**: Button, Input, Icon 등 재사용 가능한 최소 단위
- **Molecules**: SearchBox, FormField 등 Atoms 조합
- **Organisms**: Header, Sidebar 등 Molecules 조합
- **Templates**: 페이지 레이아웃 구조

### Feature-Based 구조
- **features/**: 도메인별 기능 모듈 (menu, users, roles 등)
- 각 feature는 독립적으로 관리 가능
- feature 내부에서도 Atomic Design 적용 가능

