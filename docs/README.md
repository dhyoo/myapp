# 관리자 메뉴 시스템 문서

## 📚 문서 목록

### 1. [데이터베이스 스키마](./database-schema.md)
- MENU_M, ROLE_MENU_MAP, ORG_TEAM_MENU_MAP 테이블 설계
- 예시 데이터 및 조회 쿼리

### 2. [API 엔드포인트](./api-endpoints.md)
- `/api/menus` API 명세
- 요청/응답 예시 JSON 구조
- 캐싱 전략

### 3. [디렉토리 구조](./directory-structure.md)
- Atomic Design + Feature-Based 구조 설명
- 각 디렉토리 역할 및 용도

### 4. [구현 가이드](./implementation-guide.md)
- 상태관리 전략 (Zustand + React Query)
- 권한 필터링 로직
- 사용 방법 및 예제 코드

### 5. [TDD 예시](./tdd-example.md)
- Jest + React Testing Library 사용법
- TDD 사이클 및 Best Practices

## 🚀 빠른 시작

### 1. 의존성 설치

```bash
npm install @tanstack/react-query zustand react-router-dom
npm install -D vitest @vitest/ui @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

### 2. 환경 변수 설정

`.env` 파일 생성:
```
VITE_API_BASE_URL=http://localhost:3000/api
```

### 3. 사용 예시

```tsx
import { QueryProvider } from '@/app/providers/QueryProvider';
import { Sidebar } from '@/features/menu/components/Sidebar';

function App() {
  return (
    <QueryProvider>
      <Sidebar userPermission="ADMIN" />
    </QueryProvider>
  );
}
```

## 📋 주요 기능

✅ 역할(Role) 기반 접근 제어  
✅ 조직/팀 기반 접근 제어  
✅ 동적 메뉴 로딩 및 캐싱  
✅ 권한별 메뉴 필터링  
✅ 계층적 메뉴 구조 지원  
✅ TypeScript 완전 지원  
✅ TDD 기반 테스트 코드

## 🏗️ 아키텍처

```
┌─────────────────┐
│   React Query   │ ← 서버 상태 관리 (API 캐싱)
└────────┬────────┘
         │
┌────────▼────────┐
│    Zustand      │ ← 클라이언트 상태 관리 (메뉴 캐싱)
└────────┬────────┘
         │
┌────────▼────────┐
│  Menu Filter    │ ← 권한 기반 필터링 로직
└────────┬────────┘
         │
┌────────▼────────┐
│   Components    │ ← UI 렌더링
└─────────────────┘
```

## 📝 메뉴 JSON 구조 예시

```json
{
  "menuId": "MENU_001",
  "title": "대시보드",
  "path": "/dashboard",
  "icon": "DashboardIcon",
  "permission": "READ",
  "children": null
}
```

## 🔐 권한 시스템

- **READ**: 읽기 권한 (최소 권한)
- **WRITE**: 쓰기 권한
- **DELETE**: 삭제 권한
- **ADMIN**: 관리자 권한 (최고 권한)

## 📦 파일 구조

```
src/
├── features/menu/          # 메뉴 기능 모듈
│   ├── components/         # 메뉴 UI 컴포넌트
│   ├── hooks/             # React Query hooks
│   ├── store/             # Zustand store
│   ├── utils/             # 필터링 로직
│   └── types/             # TypeScript 타입
├── shared/                # 공통 컴포넌트 및 유틸
└── app/                   # 앱 설정
```

## 🧪 테스트

```bash
# 테스트 실행
npm run test

# Watch 모드
npm run test:watch

# Coverage 확인
npm run test:coverage
```

## 📖 추가 참고사항

- 모든 메뉴 데이터는 DB에 저장됨
- 프론트엔드는 `/api/menus` API를 통해 동적으로 메뉴 로드
- 캐시는 5분간 유효
- 권한 변경 시 자동으로 캐시 무효화

