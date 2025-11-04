import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { useMenus } from '../hooks/useMenus';

// Mock useMenus hook
vi.mock('../hooks/useMenus');

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });

const renderWithProviders = (component: React.ReactElement) => {
  const queryClient = createTestQueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>{component}</BrowserRouter>
    </QueryClientProvider>
  );
};

describe('Sidebar', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('로딩 중일 때 로딩 메시지를 표시한다', () => {
    vi.mocked(useMenus).mockReturnValue({
      menus: [],
      isLoading: true,
      error: null,
      refetch: vi.fn(),
      isCached: false,
    });

    renderWithProviders(<Sidebar />);
    expect(screen.getByText('메뉴 로딩 중...')).toBeInTheDocument();
  });

  it('에러 발생 시 에러 메시지를 표시한다', () => {
    vi.mocked(useMenus).mockReturnValue({
      menus: [],
      isLoading: false,
      error: new Error('API Error'),
      refetch: vi.fn(),
      isCached: false,
    });

    renderWithProviders(<Sidebar />);
    expect(screen.getByText('메뉴를 불러올 수 없습니다.')).toBeInTheDocument();
  });

  it('메뉴 목록을 렌더링한다', async () => {
    const mockMenus = [
      {
        menuId: 'MENU_001',
        title: '대시보드',
        path: '/dashboard',
        icon: 'DashboardIcon',
        permission: 'READ' as const,
        children: null,
      },
    ];

    vi.mocked(useMenus).mockReturnValue({
      menus: mockMenus,
      isLoading: false,
      error: null,
      refetch: vi.fn(),
      isCached: false,
    });

    renderWithProviders(<Sidebar />);
    await waitFor(() => {
      expect(screen.getByText('대시보드')).toBeInTheDocument();
    });
  });
});

