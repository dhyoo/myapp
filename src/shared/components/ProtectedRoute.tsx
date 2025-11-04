import { Navigate } from 'react-router-dom';
import { usePermission } from '@/shared/hooks/usePermission';
import type { PermissionType } from '@/shared/types/common.types';
import type { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredPermission?: PermissionType;
  fallback?: ReactNode;
}

/**
 * 권한 기반 라우트 보호 컴포넌트
 */
export function ProtectedRoute({ 
  children, 
  requiredPermission = 'READ',
  fallback 
}: ProtectedRouteProps) {
  const { hasPermission } = usePermission();

  if (!hasPermission(requiredPermission)) {
    if (fallback) {
      return <>{fallback}</>;
    }
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}


