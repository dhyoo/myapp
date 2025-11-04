import type { ApiResponse } from '@/shared/types/common.types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

class ApiClient {
  private getHeaders(): HeadersInit {
    const token = localStorage.getItem('authToken');
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    // Mock 데이터를 위한 임시 처리
    if (endpoint === '/menus') {
      try {
        console.log('[API] Fetching mock menus from /mock-menus.json');
        const response = await fetch('/mock-menus.json', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (response.ok) {
          const data = await response.json();
          console.log('[API] Mock data loaded successfully:', data);
          
          // 응답 형식 검증
          if (data && data.success && Array.isArray(data.data)) {
            return data as ApiResponse<T>;
          } else {
            console.warn('[API] Invalid response format, using fallback');
          }
        } else {
          console.warn(`[API] Mock data fetch failed: ${response.status} ${response.statusText}`);
        }
      } catch (error) {
        console.error('[API] Error loading mock data:', error);
      }
      
      // Mock 데이터 실패 시 기본 데이터 반환
      console.log('[API] Using fallback menu data');
      return {
        success: true,
        data: [
          {
            menuId: 'MENU_001',
            title: '대시보드',
            path: '/dashboard',
            icon: '📊',
            permission: 'READ' as const,
            children: null,
          },
          {
            menuId: 'MENU_002',
            title: '사용자 관리',
            path: '/users',
            icon: '👥',
            permission: 'ADMIN' as const,
            children: null,
          },
          {
            menuId: 'MENU_005',
            title: '권한 관리',
            path: '/roles',
            icon: '🔐',
            permission: 'ADMIN' as const,
            children: null,
          },
        ] as T,
        timestamp: new Date().toISOString(),
      };
    }

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'GET',
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      return response.json();
    } catch (error) {
      console.error('API call failed:', error);
      throw error;
    }
  }

  async post<T>(endpoint: string, data: unknown): Promise<ApiResponse<T>> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    return response.json();
  }
}

export const apiClient = new ApiClient();

