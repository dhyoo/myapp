import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/shared/utils/api';
import type { Role } from '@/shared/types/common.types';
import { defaultRoles } from '@/shared/data/defaultData';

const ROLES_QUERY_KEY = ['roles'];

/**
 * 역할 목록 조회 React Query Hook
 */
export function useRoles() {
  const query = useQuery<{ data: Role[]; isDefault: boolean }>({
    queryKey: ROLES_QUERY_KEY,
    queryFn: async () => {
      const response = await apiClient.get<Role[]>('/roles');
      
      if (!response.success) {
        // 에러 발생 시 기본 데이터 반환
        console.warn('역할 목록 조회 실패, 기본 데이터 사용:', response.message || response.error?.message);
        return { data: defaultRoles, isDefault: true };
      }
      
      return { data: response.data || defaultRoles, isDefault: !response.data || response.data.length === 0 };
    },
    staleTime: 5 * 60 * 1000, // 5분간 fresh 상태 유지
    gcTime: 10 * 60 * 1000, // 10분간 캐시 유지
    retry: 1,
  });

  const result = query.data || { data: defaultRoles, isDefault: true };

  return {
    roles: result.data,
    isDefaultData: result.isDefault,
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  };
}

