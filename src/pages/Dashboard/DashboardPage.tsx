import { useActivities } from '@/shared/hooks/useActivities';
import { useDashboardStats } from '@/shared/hooks/useDashboardStats';
import { DataTable } from '@/shared/components/DataTable';
import { cn } from '@/shared/utils/cn';
import styles from './DashboardPage.module.css';

export default function DashboardPage() {
  const { activities, isDefaultData: isActivitiesDefault, isLoading: activitiesLoading, error: activitiesError } = useActivities();
  const { stats, isDefaultData: isStatsDefault, isLoading: statsLoading, error: statsError } = useDashboardStats();

  const formatChange = (change: string | undefined) => {
    if (!change) return null;
    const isPositive = change.includes('+') || (!change.includes('-') && parseFloat(change) >= 0);
    return <span className={isPositive ? styles.changePositive : styles.changeNegative}>{change}</span>;
  };

  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.title}>대시보드</h1>
        {(isStatsDefault || isActivitiesDefault) && (
          <div className={styles.warningBadge}>
            <svg className={styles.warningIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span className={styles.warningText}>기본 데이터 표시 중</span>
          </div>
        )}
      </div>
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          {isStatsDefault && !statsLoading && (
            <div className={styles.statBadge}>
              <span className={styles.statBadgeLabel}>기본 데이터</span>
            </div>
          )}
          <div className={styles.statHeader}>
            <h3 className={styles.statTitle}>총 사용자</h3>
            <div className={cn(styles.statIcon, styles.statIconBlue)}>
              <span className={cn(styles.statIconText, styles.statIconTextBlue)}>👥</span>
            </div>
          </div>
          {statsLoading ? (
            <p className={styles.statValue}>...</p>
          ) : statsError || !stats ? (
            <p className={styles.statError}>오류 발생</p>
          ) : (
            <>
              <p className={styles.statValue}>{(stats.totalUsers || 0).toLocaleString()}</p>
              {formatChange(stats.totalUsersChange)}
            </>
          )}
        </div>
        <div className={styles.statCard}>
          {isStatsDefault && !statsLoading && (
            <div className={styles.statBadge}>
              <span className={styles.statBadgeLabel}>기본 데이터</span>
            </div>
          )}
          <div className={styles.statHeader}>
            <h3 className={styles.statTitle}>활성 세션</h3>
            <div className={cn(styles.statIcon, styles.statIconGreen)}>
              <span className={cn(styles.statIconText, styles.statIconTextGreen)}>🟢</span>
            </div>
          </div>
          {statsLoading ? (
            <p className={styles.statValue}>...</p>
          ) : statsError || !stats ? (
            <p className={styles.statError}>오류 발생</p>
          ) : (
            <>
              <p className={styles.statValue}>{(stats.activeSessions || 0).toLocaleString()}</p>
              {formatChange(stats.activeSessionsChange)}
            </>
          )}
        </div>
        <div className={styles.statCard}>
          {isStatsDefault && !statsLoading && (
            <div className={styles.statBadge}>
              <span className={styles.statBadgeLabel}>기본 데이터</span>
            </div>
          )}
          <div className={styles.statHeader}>
            <h3 className={styles.statTitle}>오늘 방문</h3>
            <div className={cn(styles.statIcon, styles.statIconPurple)}>
              <span className={cn(styles.statIconText, styles.statIconTextPurple)}>📊</span>
            </div>
          </div>
          {statsLoading ? (
            <p className={styles.statValue}>...</p>
          ) : statsError || !stats ? (
            <p className={styles.statError}>오류 발생</p>
          ) : (
            <>
              <p className={styles.statValue}>{(stats.todayVisits || 0).toLocaleString()}</p>
              {formatChange(stats.todayVisitsChange)}
            </>
          )}
        </div>
      </div>
      
      <div className="mb-6">
        {isActivitiesDefault && !activitiesLoading && (
          <div className={styles.warningMessage}>
            <svg className={styles.warningIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p className={styles.warningText}>현재 기본 데이터가 표시되고 있습니다. API 연결 후 실제 데이터로 업데이트됩니다.</p>
          </div>
        )}
        {activitiesError && !isActivitiesDefault && (
          <div className={styles.errorMessage}>
            <p className={styles.errorMessageText}>활동 로그를 불러오는 중 오류가 발생했습니다.</p>
          </div>
        )}
        {activitiesLoading ? (
          <div className={styles.loadingContainer}>
            <p className={styles.loadingText}>로딩 중...</p>
          </div>
        ) : (
          <DataTable
            title="최근 활동 로그"
            searchPlaceholder="사용자, 작업으로 검색..."
            data={activities}
            columns={[
              {
                key: 'id',
                label: 'ID',
                sortable: true,
              },
              {
                key: 'user',
                label: '사용자',
                sortable: true,
                render: (activity) => (
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-white text-xs font-semibold">
                      {activity.user.charAt(0)}
                    </div>
                    <span className="font-medium">{activity.user}</span>
                  </div>
                ),
              },
              {
                key: 'action',
                label: '작업',
                sortable: true,
                render: (activity) => {
                  const colors: Record<string, string> = {
                    create: 'text-green-600',
                    update: 'text-blue-600',
                    delete: 'text-red-600',
                  };
                  return (
                    <span className={`font-medium ${colors[activity.type] || 'text-gray-600'}`}>
                      {activity.action}
                    </span>
                  );
                },
              },
              {
                key: 'target',
                label: '대상',
                sortable: true,
              },
              {
                key: 'time',
                label: '시간',
                sortable: true,
              },
            ]}
          />
        )}
      </div>
    </div>
  );
}


