import { useState } from 'react';
import type { ReactNode } from 'react';
import { TopHeader } from './TopHeader';
import { BottomFooter } from './BottomFooter';
import { Sidebar } from '@/features/menu/components/Sidebar';
import type { PermissionType } from '@/shared/types/common.types';
import styles from './DashboardLayout.module.css';

interface DashboardLayoutProps {
  children: ReactNode;
  initialPermission?: PermissionType;
}

export function DashboardLayout({ children, initialPermission = 'ADMIN' }: DashboardLayoutProps) {
  const [permission, setPermission] = useState<PermissionType>(initialPermission);

  return (
    <div className={styles.layout} style={{ minWidth: '800px' }}>
      {/* TOP */}
      <TopHeader
        userPermission={permission}
        onPermissionChange={setPermission}
      />

      <div className={styles.content}>
        {/* LEFT - 항상 표시 (최소 너비 256px 유지) */}
        <div className={styles.sidebar} style={{ minWidth: '256px' }}>
          <Sidebar userPermission={permission} />
        </div>

        {/* MAIN - 사이드바 너비만큼 여백 추가 */}
        <main className={styles.main} style={{ minWidth: '544px' }}>
          <div className={styles.mainContent}>
            <div className={styles.mainInner}>
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

