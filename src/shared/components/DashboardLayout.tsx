import { useState, useEffect, type ReactNode } from 'react';
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 모바일 메뉴 닫기
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* TOP */}
      <TopHeader
        userPermission={permission}
        onPermissionChange={setPermission}
      />

      <div className="flex flex-1 pt-16 pb-12">
        {/* LEFT */}
        <div className="hidden lg:block fixed left-0 top-16 bottom-12">
          <Sidebar userPermission={permission} />
        </div>

        {/* 모바일 메뉴 오버레이 */}
        {isMobileMenuOpen && (
          <>
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <div className="fixed left-0 top-16 bottom-12 w-64 z-50 lg:hidden">
              <Sidebar userPermission={permission} />
            </div>
          </>
        )}

        {/* MAIN */}
        <main className="flex-1 lg:ml-64 w-full min-w-0">
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

