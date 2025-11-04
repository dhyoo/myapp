# TDD (Test-Driven Development) 예시

## Jest + React Testing Library (RTL) 사용 가이드

### 1. 테스트 설정

먼저 필요한 패키지를 설치합니다:

```bash
npm install -D vitest @vitest/ui @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

### 2. TDD 흐름 예시: MenuItem 컴포넌트

#### Step 1: 테스트 작성 (Red)

먼저 실패하는 테스트를 작성합니다.

```typescript
// MenuItem.test.tsx
describe('MenuItem', () => {
  it('메뉴 항목을 렌더링한다', () => {
    render(<MenuItem menu={mockMenu} />);
    expect(screen.getByText('대시보드')).toBeInTheDocument();
  });
});
```

#### Step 2: 최소 구현 (Green)

테스트를 통과시키는 최소한의 코드를 작성합니다.

```typescript
// MenuItem.tsx
export function MenuItem({ menu }: MenuItemProps) {
  return <div>{menu.title}</div>;
}
```

#### Step 3: 리팩토링 (Refactor)

코드를 개선하고 테스트가 계속 통과하는지 확인합니다.

```typescript
// MenuItem.tsx
export function MenuItem({ menu }: MenuItemProps) {
  return (
    <Link to={menu.path}>
      <span>{menu.icon}</span>
      <span>{menu.title}</span>
    </Link>
  );
}
```

### 3. 실제 테스트 코드 예시

#### 컴포넌트 테스트

```typescript
// features/menu/components/MenuItem.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { MenuItem } from './MenuItem';

describe('MenuItem', () => {
  const mockMenu = {
    menuId: 'MENU_001',
    title: '대시보드',
    path: '/dashboard',
    icon: 'DashboardIcon',
    permission: 'READ' as const,
    children: null,
  };

  it('메뉴 제목을 표시한다', () => {
    render(<MenuItem menu={mockMenu} />);
    expect(screen.getByText('대시보드')).toBeInTheDocument();
  });

  it('메뉴 클릭 시 올바른 경로로 이동한다', () => {
    render(<MenuItem menu={mockMenu} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/dashboard');
  });
});
```

#### Hook 테스트

```typescript
// features/menu/hooks/useMenuFilter.test.ts
import { renderHook } from '@testing-library/react';
import { useMenuFilter } from './useMenuFilter';

describe('useMenuFilter', () => {
  it('권한별로 메뉴를 필터링한다', () => {
    const { result } = renderHook(() => useMenuFilter('WRITE'));
    
    expect(result.current).toHaveLength(1);
    expect(result.current[0].permission).toBe('WRITE');
  });
});
```

#### 유틸리티 함수 테스트

```typescript
// features/menu/utils/menuFilter.test.ts
import { filterMenusByPermission } from './menuFilter';

describe('filterMenusByPermission', () => {
  it('READ 권한으로 필터링한다', () => {
    const menus = [
      { permission: 'READ', ... },
      { permission: 'ADMIN', ... },
    ];
    
    const filtered = filterMenusByPermission(menus, 'READ');
    expect(filtered).toHaveLength(2);
  });
});
```

### 4. 테스트 실행

```bash
# 테스트 실행
npm run test

# Watch 모드
npm run test:watch

# Coverage 확인
npm run test:coverage
```

### 5. TDD 사이클

1. **Red**: 실패하는 테스트 작성
2. **Green**: 테스트를 통과시키는 최소 코드 작성
3. **Refactor**: 코드 개선 및 최적화
4. 반복

### 6. Best Practices

- **테스트는 독립적이어야 함**: 각 테스트는 다른 테스트에 의존하지 않아야 함
- **명확한 테스트 이름**: 테스트 이름은 무엇을 테스트하는지 명확히 표현
- **AAA 패턴**: Arrange (준비), Act (실행), Assert (검증)
- **Mock 사용**: 외부 의존성은 Mock으로 처리
- **Edge Case 테스트**: 예외 상황과 경계값 테스트

