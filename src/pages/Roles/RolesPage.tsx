import { useRoles } from '@/shared/hooks/useRoles';
import { DataTable } from '@/shared/components/DataTable';

export default function RolesPage() {
  const { roles, isDefaultData, isLoading, error } = useRoles();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">권한 관리</h1>
        {isDefaultData && !isLoading && (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-yellow-50 border border-yellow-200 rounded-md">
            <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span className="text-xs font-medium text-yellow-800">기본 데이터</span>
          </div>
        )}
      </div>
      {isDefaultData && !isLoading && (
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex items-center gap-2">
          <svg className="w-4 h-4 text-yellow-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p className="text-yellow-800 text-sm">현재 기본 데이터가 표시되고 있습니다. API 연결 후 실제 데이터로 업데이트됩니다.</p>
        </div>
      )}
      {error && !isDefaultData && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">역할 목록을 불러오는 중 오류가 발생했습니다.</p>
        </div>
      )}
      {isLoading ? (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <p className="text-gray-500">로딩 중...</p>
        </div>
      ) : (
        <DataTable
          title="역할 목록"
          searchPlaceholder="역할명, 코드로 검색..."
          data={roles}
          columns={[
            {
              key: 'id',
              label: 'ID',
              sortable: true,
            },
            {
              key: 'name',
              label: '역할명',
              sortable: true,
              render: (role) => (
                <div>
                  <div className="font-semibold text-gray-900">{role.name}</div>
                  <div className="text-xs text-gray-500">{role.code}</div>
                </div>
              ),
            },
            {
              key: 'description',
              label: '설명',
              render: (role) => (
                <span className="text-sm text-gray-600">{role.description}</span>
              ),
            },
            {
              key: 'userCount',
              label: '사용자 수',
              sortable: true,
              render: (role) => (
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                  {role.userCount}명
                </span>
              ),
            },
            {
              key: 'permissions',
              label: '권한',
              render: (role) => (
                <div className="flex flex-wrap gap-1">
                  {role.permissions.map((perm: string) => (
                    <span
                      key={perm}
                      className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs"
                    >
                      {perm}
                    </span>
                  ))}
                </div>
              ),
            },
            {
              key: 'createdAt',
              label: '생성일',
              sortable: true,
            },
            {
              key: 'actions',
              label: '작업',
              render: () => (
                <div className="flex items-center gap-2">
                  <button className="px-2 py-1 text-xs text-primary-600 hover:text-primary-700 font-medium">
                    수정
                  </button>
                  <button className="px-2 py-1 text-xs text-red-600 hover:text-red-700 font-medium">
                    삭제
                  </button>
                </div>
              ),
            },
          ]}
        />
      )}
    </div>
  );
}


