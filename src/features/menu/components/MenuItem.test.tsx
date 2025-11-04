import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { MenuItem } from './MenuItem';
import type { MenuItem as MenuItemType } from '../types/menu.types';

// React Router Mock
const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('MenuItem', () => {
  const mockMenu: MenuItemType = {
    menuId: 'MENU_001',
    title: '대시보드',
    path: '/dashboard',
    icon: 'DashboardIcon',
    permission: 'READ',
    children: null,
  };

  it('메뉴 항목을 렌더링한다', () => {
    renderWithRouter(<MenuItem menu={mockMenu} />);
    expect(screen.getByText('대시보드')).toBeInTheDocument();
  });

  it('메뉴 링크가 올바른 경로를 가진다', () => {
    renderWithRouter(<MenuItem menu={mockMenu} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/dashboard');
  });

  it('아이콘을 표시한다', () => {
    renderWithRouter(<MenuItem menu={mockMenu} />);
    expect(screen.getByText('DashboardIcon')).toBeInTheDocument();
  });

  describe('자식 메뉴가 있는 경우', () => {
    const menuWithChildren: MenuItemType = {
      ...mockMenu,
      menuId: 'MENU_002',
      title: '사용자 관리',
      path: '/users',
      children: [
        {
          menuId: 'MENU_003',
          title: '사용자 목록',
          path: '/users/list',
          icon: 'UserListIcon',
          permission: 'READ',
          children: null,
        },
      ],
    };

    it('자식 메뉴를 클릭하면 펼쳐진다', () => {
      renderWithRouter(<MenuItem menu={menuWithChildren} />);
      const link = screen.getByRole('link', { name: /사용자 관리/ });
      
      // 초기에는 자식이 보이지 않음
      expect(screen.queryByText('사용자 목록')).not.toBeInTheDocument();
      
      // 클릭 시 펼쳐짐
      fireEvent.click(link);
      expect(screen.getByText('사용자 목록')).toBeInTheDocument();
    });

    it('다시 클릭하면 접힌다', () => {
      renderWithRouter(<MenuItem menu={menuWithChildren} />);
      const link = screen.getByRole('link', { name: /사용자 관리/ });
      
      fireEvent.click(link);
      expect(screen.getByText('사용자 목록')).toBeInTheDocument();
      
      fireEvent.click(link);
      expect(screen.queryByText('사용자 목록')).not.toBeInTheDocument();
    });
  });
});

