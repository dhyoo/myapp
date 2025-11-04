# 관리자 메뉴 시스템

역할(Role), 조직(Organization), 팀(Team) 기반 접근 제어를 지원하는 관리자 메뉴 시스템입니다.

## 📋 목차

- [주요 기능](#주요-기능)
- [기술 스택](#기술-스택)
- [프로젝트 구조](#프로젝트-구조)
- [시작하기](#시작하기)
- [아키텍처](#아키텍처)
- [데이터베이스 설계](#데이터베이스-설계)
- [API 설계](#api-설계)
- [사용 방법](#사용-방법)
- [스타일링](#스타일링)
- [테스트](#테스트)
- [주요 작업 내역](#주요-작업-내역)

## ✨ 주요 기능

- ✅ **역할(Role) 기반 접근 제어**: 역할별 메뉴 접근 권한 관리
- ✅ **조직/팀 기반 접근 제어**: 조직 및 팀별 메뉴 접근 제어 지원
- ✅ **동적 메뉴 로딩**: DB에서 메뉴 정보를 동적으로 로드
- ✅ **권한별 메뉴 필터링**: 계층적 권한 시스템 (READ < WRITE < DELETE < ADMIN)
- ✅ **메뉴 캐싱**: Zustand + React Query를 통한 이중 캐싱
- ✅ **계층적 메뉴 구조**: 부모-자식 관계를 지원하는 트리 구조
- ✅ **TypeScript 완전 지원**: 타입 안전성 보장
- ✅ **Tailwind CSS**: 전문적인 UI 디자인
- ✅ **에러 처리**: ErrorBoundary를 통한 안정적인 에러 처리

## 🛠 기술 스택

### 프론트엔드
- **React 19** - UI 라이브러리
- **TypeScript** - 타입 안전성
- **Vite** - 빌드 도구
- **React Router** - 라우팅
- **Tailwind CSS** - 스타일링
- **Zustand** - 클라이언트 상태 관리
- **React Query (@tanstack/react-query)** - 서버 상태 관리 및 캐싱

### 개발 도구
- **Vitest** - 테스트 프레임워크
- **React Testing Library** - 컴포넌트 테스트
- **ESLint** - 코드 품질 관리

## 📁 프로젝트 구조

```
my-app/
├── docs/                          # 문서 디렉토리
│   ├── database-schema.md         # DB 스키마 설계
│   ├── api-endpoints.md          # API 명세
│   ├── directory-structure.md    # 디렉토리 구조 가이드
│   ├── implementation-guide.md  # 구현 가이드
│   ├── tdd-example.md           # TDD 예시
│   └── menu-example.json        # 메뉴 JSON 예시
│
├── public/
│   └── mock-menus.json          # Mock 메뉴 데이터
│
├── src/
│   ├── app/                      # 앱 설정 및 전역 설정
│   │   ├── components/
│   │   │   └── ErrorBoundary.tsx # 에러 바운더리
│   │   └── providers/
│   │       └── QueryProvider.tsx # React Query Provider
│   │
│   ├── features/                 # Feature-Based 구조 (도메인별)
│   │   └── menu/                 # 메뉴 관리 Feature
│   │       ├── components/
│   │       │   ├── Sidebar.tsx   # 사이드바 컴포넌트
│   │       │   ├── MenuItem.tsx  # 메뉴 아이템 컴포넌트
│   │       │   └── *.test.tsx    # 테스트 파일
│   │       ├── hooks/
│   │       │   ├── useMenus.ts   # React Query hook
│   │       │   └── useMenuFilter.ts # 권한 필터링 hook
│   │       ├── store/
│   │       │   └── menuStore.ts  # Zustand store
│   │       ├── types/
│   │       │   └── menu.types.ts # TypeScript 타입
│   │       └── utils/
│   │           ├── menuFilter.ts # 권한 필터링 로직
│   │           └── *.test.ts    # 테스트 파일
│   │
│   ├── shared/                    # 공통 컴포넌트 및 유틸
│   │   ├── types/
│   │   │   └── common.types.ts  # 공통 타입
│   │   └── utils/
│   │       └── api.ts            # API 클라이언트
│   │
│   ├── App.tsx                   # 메인 App 컴포넌트
│   ├── main.tsx                  # 엔트리 포인트
│   ├── index.css                 # Tailwind CSS 설정
│   └── App.css                   # 추가 스타일
│
├── tailwind.config.js            # Tailwind 설정
├── postcss.config.js             # PostCSS 설정
├── vitest.config.ts              # Vitest 설정
└── vite.config.ts                # Vite 설정
```

## 🚀 시작하기

### 1. 의존성 설치

```bash
# 필수 의존성
npm install @tanstack/react-query zustand react-router-dom tailwindcss postcss autoprefixer

# 개발 의존성 (테스트)
npm install -D vitest @vitest/ui @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

### 2. 환경 변수 설정

`.env` 파일 생성:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

### 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:5173` 접속

### 4. 빌드

```bash
npm run build
```

## 🏗 아키텍처

### 상태관리 전략

```
┌─────────────────┐
│   React Query   │ ← 서버 상태 관리 (API 캐싱)
│   (5분 캐시)    │
└────────┬────────┘
         │
┌────────▼────────┐
│    Zustand      │ ← 클라이언트 상태 관리 (메뉴 캐싱)
│   (5분 캐시)    │
└────────┬────────┘
         │
┌────────▼────────┐
│  Menu Filter    │ ← 권한 기반 필터링 로직
│  (계층적 권한)  │
└────────┬────────┘
         │
┌────────▼────────┐
│   Components    │ ← UI 렌더링 (Tailwind CSS)
│   (Tailwind)    │
└─────────────────┘
```

### 디자인 패턴

- **Atomic Design**: Atoms → Molecules → Organisms → Templates
- **Feature-Based**: 도메인별 기능 모듈화
- **Custom Hooks**: 비즈니스 로직 분리
- **Error Boundary**: 안정적인 에러 처리

## 🗄 데이터베이스 설계

### 테이블 구조

#### 1. MENU_M (메뉴 마스터)
- `MENU_ID`: 메뉴 ID (PK)
- `MENU_NM`: 메뉴명
- `MENU_PATH`: 라우팅 경로
- `MENU_ICON`: 메뉴 아이콘
- `PARENT_MENU_ID`: 부모 메뉴 ID (FK)
- `MENU_ORDER`: 메뉴 순서
- `MENU_LEVEL`: 메뉴 레벨

#### 2. ROLE_MENU_MAP (역할-메뉴 매핑)
- `ROLE_MENU_MAP_ID`: 매핑 ID (PK)
- `ROLE_ID`: 역할 ID
- `MENU_ID`: 메뉴 ID (FK)
- `PERMISSION_TYPE`: 권한 타입 (READ/WRITE/DELETE/ADMIN)

#### 3. ORG_TEAM_MENU_MAP (조직/팀-메뉴 매핑)
- `ORG_TEAM_MENU_MAP_ID`: 매핑 ID (PK)
- `ORG_ID`: 조직 ID
- `TEAM_ID`: 팀 ID
- `MENU_ID`: 메뉴 ID (FK)
- `PERMISSION_TYPE`: 권한 타입

자세한 스키마는 `docs/database-schema.md` 참조

## 🔌 API 설계

### GET /api/menus

메뉴 조회 API

**요청 헤더:**
```
Authorization: Bearer <token>
```

**응답 예시:**
```json
{
  "success": true,
  "data": [
    {
      "menuId": "MENU_001",
      "title": "대시보드",
      "path": "/dashboard",
      "icon": "📊",
      "permission": "READ",
      "children": null
    },
    {
      "menuId": "MENU_002",
      "title": "사용자 관리",
      "path": "/users",
      "icon": "👥",
      "permission": "ADMIN",
      "children": [
        {
          "menuId": "MENU_003",
          "title": "사용자 목록",
          "path": "/users/list",
          "icon": "📋",
          "permission": "READ",
          "children": null
        }
      ]
    }
  ],
  "timestamp": "2024-01-15T10:30:00Z"
}
```

자세한 API 명세는 `docs/api-endpoints.md` 참조

## 💻 사용 방법

### 기본 사용

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

### Hook 사용

```tsx
import { useMenus } from '@/features/menu/hooks/useMenus';

function MyComponent() {
  const { menus, isLoading, error, refetch } = useMenus('READ');
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <ul>
      {menus.map(menu => (
        <li key={menu.menuId}>{menu.title}</li>
      ))}
    </ul>
  );
}
```

### 권한 확인

```tsx
import { useMenuPermission } from '@/features/menu/hooks/useMenuFilter';

function ProtectedComponent() {
  const permission = useMenuPermission('/users/create');
  
  if (permission !== 'WRITE') {
    return <div>권한이 없습니다.</div>;
  }
  
  return <div>사용자 등록 폼</div>;
}
```

## 🎨 스타일링

### Tailwind CSS

프로젝트는 Tailwind CSS를 사용하여 전문적인 UI를 제공합니다.

**주요 특징:**
- 커스텀 컬러 팔레트 (primary-600 등)
- 반응형 디자인
- 부드러운 애니메이션
- 그라데이션 효과
- 그림자 및 호버 효과

**커스텀 클래스:**
```css
.menu-link {
  @apply flex items-center gap-3 px-4 py-3 rounded-lg 
         text-gray-700 no-underline transition-all duration-200 
         hover:bg-gray-100;
}

.menu-link.active {
  @apply bg-primary-600 text-white hover:bg-primary-700;
}
```

## 🧪 테스트

### 테스트 실행

```bash
# 테스트 실행
npm run test

# Watch 모드
npm run test:watch

# Coverage 확인
npm run test:coverage
```

### 테스트 구조

- **컴포넌트 테스트**: `*.test.tsx`
- **유틸리티 테스트**: `*.test.ts`
- **TDD 예시**: `docs/tdd-example.md` 참조

## 📝 주요 작업 내역

### 1. 데이터베이스 설계
- ✅ MENU_M, ROLE_MENU_MAP, ORG_TEAM_MENU_MAP 테이블 설계
- ✅ 예시 데이터 및 조회 쿼리 작성
- ✅ 문서화 (`docs/database-schema.md`)

### 2. API 설계
- ✅ `/api/menus` 엔드포인트 명세
- ✅ JSON 메뉴 구조 정의
- ✅ TypeScript 타입 정의
- ✅ Mock 데이터 구현 (`public/mock-menus.json`)

### 3. 프론트엔드 구조 설계
- ✅ Atomic Design + Feature-Based 디렉토리 구조
- ✅ TypeScript 타입 시스템 구축
- ✅ Path alias 설정 (`@/`)

### 4. 상태관리 구현
- ✅ Zustand Store (`menuStore.ts`)
  - 메뉴 데이터 클라이언트 캐싱
  - 필터링된 메뉴 저장
  - 로딩/에러 상태 관리
- ✅ React Query Hook (`useMenus.ts`)
  - `/api/menus` API 호출
  - 자동 캐싱 (5분 TTL)
  - 재시도 로직
- ✅ 권한 필터링 로직 (`menuFilter.ts`)
  - 계층적 권한 시스템
  - 트리 구조 메뉴 필터링

### 5. UI 컴포넌트 구현
- ✅ `Sidebar` 컴포넌트
  - 고정 레이아웃
  - 로딩 스피너
  - 에러 표시
- ✅ `MenuItem` 컴포넌트
  - 계층적 메뉴 구조
  - 활성 상태 표시
  - 자식 메뉴 펼치기/접기
- ✅ `ErrorBoundary` 컴포넌트
  - 에러 캐칭 및 표시
  - 상세 에러 정보

### 6. 스타일링
- ✅ Tailwind CSS 설정 및 통합
- ✅ 커스텀 컬러 팔레트 정의
- ✅ 반응형 디자인 구현
- ✅ 그라데이션 및 애니메이션 효과

### 7. 테스트 코드
- ✅ 컴포넌트 테스트 (MenuItem, Sidebar)
- ✅ Hook 테스트 (useMenus, useMenuFilter)
- ✅ 유틸리티 함수 테스트 (menuFilter)
- ✅ Vitest 설정

### 8. 문서화
- ✅ 데이터베이스 스키마 문서
- ✅ API 엔드포인트 문서
- ✅ 디렉토리 구조 가이드
- ✅ 구현 가이드
- ✅ TDD 예시 문서
- ✅ README.md 작성

### 9. 에러 처리 및 안정화
- ✅ ErrorBoundary 구현
- ✅ 안전한 null 체크
- ✅ 에러 로깅
- ✅ Fallback 데이터 제공

### 10. 파일 정리
- ✅ 불필요한 파일 삭제
  - `package.json.example`
  - `src/assets/react.svg`
  - `public/vite.svg`
  - `IMPLEMENTATION_SUMMARY.md` (내용 통합)

## 🔐 권한 시스템

계층적 권한 시스템을 사용합니다:

- **READ** (레벨 1): 읽기 권한 (최소 권한)
- **WRITE** (레벨 2): 쓰기 권한
- **DELETE** (레벨 3): 삭제 권한
- **ADMIN** (레벨 4): 관리자 권한 (최고 권한)

사용자는 자신의 권한 레벨 이상의 메뉴만 접근할 수 있습니다.

## 📚 추가 문서

자세한 내용은 `docs/` 디렉토리를 참조하세요:

- `docs/database-schema.md` - 데이터베이스 스키마 상세
- `docs/api-endpoints.md` - API 명세 상세
- `docs/directory-structure.md` - 디렉토리 구조 가이드
- `docs/implementation-guide.md` - 구현 가이드
- `docs/tdd-example.md` - TDD 예시

## 🚧 향후 개선 사항

- [ ] 다국어 지원 (i18n)
- [ ] 동적 아이콘 레지스트리
- [ ] 사용자별 메뉴 순서 커스터마이징
- [ ] 메뉴 검색 기능
- [ ] 메뉴 즐겨찾기 기능
- [ ] 다크 모드 지원

## 📄 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다.

## 👥 기여

버그 리포트나 기능 제안은 이슈를 등록해주세요.

---

**개발 완료일**: 2024년 11월  
**버전**: 1.0.0
