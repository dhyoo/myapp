import { useMemo } from 'react';
import type { PermissionType } from '@/shared/types/common.types';

/**
 * 권한 관리 통합 Hook
 * Role / Team / Org 권한 체크 로직을 통합
 */
export function usePermission() {
  // TODO: 실제 권한 정보는 Context나 Store에서 가져오도록 수정
  const currentPermission: PermissionType = 'ADMIN'; // 임시 하드코딩

  /**
   * 권한 레벨 체크
   */
  const permissionLevels: Record<PermissionType, number> = {
    READ: 1,
    WRITE: 2,
    DELETE: 3,
    ADMIN: 4,
  };

  /**
   * 권한이 충분한지 확인
   */
  const hasPermission = useMemo(() => {
    return (requiredPermission: PermissionType): boolean => {
      const currentLevel = permissionLevels[currentPermission] || 0;
      const requiredLevel = permissionLevels[requiredPermission] || 0;
      return currentLevel >= requiredLevel;
    };
  }, [currentPermission]);

  /**
   * 여러 권한 중 하나라도 충족하는지 확인
   */
  const hasAnyPermission = useMemo(() => {
    return (requiredPermissions: PermissionType[]): boolean => {
      return requiredPermissions.some(perm => hasPermission(perm));
    };
  }, [hasPermission]);

  /**
   * 모든 권한이 충족하는지 확인
   */
  const hasAllPermissions = useMemo(() => {
    return (requiredPermissions: PermissionType[]): boolean => {
      return requiredPermissions.every(perm => hasPermission(perm));
    };
  }, [hasPermission]);

  return {
    currentPermission,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    isAdmin: currentPermission === 'ADMIN',
    isReadOnly: currentPermission === ('READ' as PermissionType),
  };
}


