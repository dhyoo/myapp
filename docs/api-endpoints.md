# API 엔드포인트 설계

## GET /api/menus

사용자의 역할과 조직/팀 정보를 기반으로 접근 가능한 메뉴를 조회합니다.

### 요청
- **Headers**: 
  - `Authorization: Bearer <token>`
- **Query Parameters**: 없음 (인증 토큰에서 사용자 정보 추출)

### 응답 예시

```json
{
  "success": true,
  "data": [
    {
      "menuId": "MENU_001",
      "title": "대시보드",
      "path": "/dashboard",
      "icon": "DashboardIcon",
      "permission": "READ",
      "children": null
    },
    {
      "menuId": "MENU_002",
      "title": "사용자 관리",
      "path": "/users",
      "icon": "UserIcon",
      "permission": "ADMIN",
      "children": [
        {
          "menuId": "MENU_003",
          "title": "사용자 목록",
          "path": "/users/list",
          "icon": "UserListIcon",
          "permission": "READ",
          "children": null
        },
        {
          "menuId": "MENU_004",
          "title": "사용자 등록",
          "path": "/users/create",
          "icon": "UserAddIcon",
          "permission": "WRITE",
          "children": null
        }
      ]
    },
    {
      "menuId": "MENU_005",
      "title": "권한 관리",
      "path": "/roles",
      "icon": "RoleIcon",
      "permission": "ADMIN",
      "children": null
    },
    {
      "menuId": "MENU_006",
      "title": "조직 관리",
      "path": "/organizations",
      "icon": "OrganizationIcon",
      "permission": "READ",
      "children": null
    }
  ],
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### 타입 정의 (TypeScript)

```typescript
interface MenuItem {
  menuId: string;
  title: string;
  path: string;
  icon: string;
  permission: 'READ' | 'WRITE' | 'DELETE' | 'ADMIN';
  children: MenuItem[] | null;
}

interface MenuResponse {
  success: boolean;
  data: MenuItem[];
  timestamp: string;
}
```

### 에러 응답

```json
{
  "success": false,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "인증이 필요합니다."
  }
}
```

## 캐싱 전략

- **캐시 키**: `menus:${userId}:${roleId}:${orgId}:${teamId}`
- **캐시 TTL**: 5분 (300초)
- **캐시 무효화**: 사용자 권한 변경 시, 메뉴 정보 변경 시

