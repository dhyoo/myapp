import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/shared/utils/api';
import type { User } from '@/shared/types/common.types';
import { defaultUsers } from '@/shared/data/defaultData';

const USERS_QUERY_KEY = ['users'];

/**
 * 사용자 목록 조회 React Query Hook
 */
export function useUsers() {
  const query = useQuery<{ data: User[]; isDefault: boolean }>({
    queryKey: USERS_QUERY_KEY,
    queryFn: async () => {
      const response = await apiClient.get<User[]>('/users');
      
      if (!response.success) {
        // 에러 발생 시 기본 데이터 반환
        console.warn('사용자 목록 조회 실패, 기본 데이터 사용:', response.message || response.error?.message);
        return { data: defaultUsers, isDefault: true };
      }
      
      return { data: response.data || defaultUsers, isDefault: !response.data || response.data.length === 0 };
    },
    staleTime: 2 * 60 * 1000, // 2분간 fresh 상태 유지
    gcTime: 10 * 60 * 1000, // 10분간 캐시 유지
    retry: 1,
  });

  const result = query.data || { data: defaultUsers, isDefault: true };

  return {
    users: result.data,
    isDefaultData: result.isDefault,
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  };
}

