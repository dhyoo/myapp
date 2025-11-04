# 관리자 메뉴 시스템 구현 가이드

## 개요

이 문서는 역할(Role), 조직(Organization), 팀(Team) 기반 접근 제어를 지원하는 관리자 메뉴 시스템의 구현 방법을 설명합니다.

## 1. 아키텍처 개요

### 1.1 데이터베이스 구조
- **MENU_M**: 메뉴 마스터 정보 저장
- **ROLE_MENU_MAP**: 역할별 메뉴 접근 권한 매핑
- **ORG_TEAM_MENU_MAP**: 조직/팀별 메뉴 접근 권한 매핑

### 1.2 프론트엔드 구조
- **Atomic Design**: 재사용 가능한 컴포넌트 계층 구조
- **Feature-Based**: 도메인별 기능 모듈화
- **상태관리**: Zustand (클라이언트 상태) + React Query (서버 상태)

## 2. 상태관리 전략

### 2.1 Zustand Store (menuStore.ts)
- **목적**: 메뉴 데이터 클라이언트 캐싱
- **기능**:
  - 메뉴 데이터 저장
  - 필터링된 메뉴 저장
  - 로딩 상태 관리
  - 에러 상태 관리
  - localStorage 영구 저장

### 2.2 React Query (useMenus.ts)
- **목적**: 서버 데이터 페칭 및 캐싱
- **기능**:
  - `/api/menus` API 호출
  - 자동 캐싱 (5분 TTL)
  - 재시도 로직
  - Stale-while-revalidate 패턴

### 2.3 권한 필터링 로직 (menuFilter.ts)
- **계층적 권한 시스템**:
  ```
  READ (1) < WRITE (2) < DELETE (3) < ADMIN (4)
  ```
- **필터링 규칙**:
  - 사용자 권한 레벨 이상의 메뉴만 표시
  - 부모 메뉴 권한이 부족해도 자식 메뉴가 허용되면 부모 표시

## 3. 사용 방법

### 3.1 기본 사용

```tsx
import { Sidebar } from '@/features/menu/components/Sidebar';

function App() {
  return (
    <div>
      <Sidebar userPermission="ADMIN" />
    </div>
  );
}
```

### 3.2 메뉴 Hook 사용

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

### 3.3 권한 확인

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

## 4. API 통합

### 4.1 API 엔드포인트
- **URL**: `GET /api/menus`
- **인증**: Bearer Token (Authorization Header)
- **응답**: JSON 형태의 메뉴 트리 구조

### 4.2 캐싱 전략
- **클라이언트 캐시**: Zustand + localStorage (5분)
- **서버 캐시**: React Query (5분 staleTime, 10분 gcTime)
- **캐시 무효화**: 권한 변경 시 자동 무효화

## 5. 테스트 전략

### 5.1 단위 테스트
- **컴포넌트**: React Testing Library
- **Hook**: renderHook 사용
- **유틸리티**: 순수 함수 테스트

### 5.2 TDD 흐름
1. 테스트 작성 (Red)
2. 최소 구현 (Green)
3. 리팩토링 (Refactor)

## 6. 확장 가능성

### 6.1 다국어 지원
메뉴 구조에 `titleI18nKey` 필드 추가 가능

### 6.2 동적 아이콘
아이콘 문자열을 컴포넌트로 매핑하는 레지스트리 패턴 사용

### 6.3 메뉴 순서 커스터마이징
사용자별 메뉴 순서 저장 및 적용

