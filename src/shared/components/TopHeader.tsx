import type { PermissionType } from '@/shared/types/common.types';
import styles from './TopHeader.module.css';

interface TopHeaderProps {
  userPermission: PermissionType;
  onPermissionChange: (permission: PermissionType) => void;
}

export function TopHeader({ userPermission, onPermissionChange }: TopHeaderProps) {

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* 왼쪽: 로고 */}
        <div className={styles.logoSection}>
          <div className={styles.logoContainer}>
            <div className={styles.logoIcon}>
              <svg className={styles.logoSvg} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h1 className={styles.title}>
              관리자 메뉴 시스템
            </h1>
          </div>
        </div>

        {/* 오른쪽: 권한 선택 및 사용자 정보 */}
        <div className={styles.rightSection}>
          <label className={styles.permissionLabel}>
            <span className={styles.permissionText}>
              권한:
            </span>
            <select
              value={userPermission}
              onChange={(e) => onPermissionChange(e.target.value as PermissionType)}
              className={styles.permissionSelect}
            >
              <option value="READ">READ</option>
              <option value="WRITE">WRITE</option>
              <option value="DELETE">DELETE</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          </label>
          <div className={styles.userInfo}>
            <div className={styles.userAvatar}>
              U
            </div>
            <span className={styles.userName}>사용자</span>
          </div>
        </div>
      </div>
    </header>
  );
}

