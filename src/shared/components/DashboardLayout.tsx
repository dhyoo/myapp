import { useState, type ReactNode } from 'react';
import { TopHeader } from './TopHeader';
import { BottomFooter } from './BottomFooter';
import { Sidebar } from '@/features/menu/components/Sidebar';
import type { PermissionType } from '@/shared/types/common.types';

interface DashboardLayoutProps {
  children: ReactNode;
  initialPermission?: PermissionType;
}

export function DashboardLayout({ children, initialPermission = 'ADMIN' }: DashboardLayoutProps) {
  const [permission, setPermission] = useState<PermissionType>(initialPermission);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50" style={{ minWidth: '800px' }}>
      {/* TOP */}
      <TopHeader
        userPermission={permission}
        onPermissionChange={setPermission}
      />

      <div className="flex flex-1 pt-16 pb-12">
        {/* LEFT - 항상 표시 (최소 너비 256px 유지) */}
        <div className="fixed left-0 top-16 bottom-12 w-64 z-30 flex-shrink-0" style={{ minWidth: '256px' }}>
          <Sidebar userPermission={permission} />
        </div>

        {/* MAIN - 사이드바 너비만큼 여백 추가 */}
        <main className="flex-1 ml-64 w-full min-w-0" style={{ minWidth: '544px' }}>
          <div className="h-full overflow-y-auto bg-gray-50">
            <div className="p-6 max-w-7xl mx-auto">
              {children}
            </div>
          </div>
        </main>
      </div>

      {/* BOTTOM */}
      <BottomFooter />
    </div>
  );
}

