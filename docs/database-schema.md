# 데이터베이스 스키마 설계

## 1. MENU_M (메뉴 마스터 테이블)

메뉴의 기본 정보를 저장하는 테이블입니다.

```sql
CREATE TABLE MENU_M (
    MENU_ID VARCHAR(50) PRIMARY KEY COMMENT '메뉴 ID',
    MENU_NM VARCHAR(100) NOT NULL COMMENT '메뉴명',
    MENU_PATH VARCHAR(200) COMMENT '메뉴 경로 (라우팅 경로)',
    MENU_ICON VARCHAR(100) COMMENT '메뉴 아이콘 (예: HomeIcon, UserIcon)',
    PARENT_MENU_ID VARCHAR(50) COMMENT '부모 메뉴 ID (NULL이면 최상위 메뉴)',
    MENU_ORDER INT DEFAULT 0 COMMENT '메뉴 순서',
    MENU_LEVEL INT DEFAULT 1 COMMENT '메뉴 레벨 (1: 최상위, 2: 하위, ...)',
    IS_ACTIVE CHAR(1) DEFAULT 'Y' COMMENT '활성화 여부 (Y/N)',
    IS_VISIBLE CHAR(1) DEFAULT 'Y' COMMENT '표시 여부 (Y/N)',
    DESCRIPTION VARCHAR(500) COMMENT '메뉴 설명',
    CREATED_AT DATETIME DEFAULT CURRENT_TIMESTAMP,
    UPDATED_AT DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_parent_menu (PARENT_MENU_ID),
    INDEX idx_menu_order (MENU_ORDER),
    FOREIGN KEY (PARENT_MENU_ID) REFERENCES MENU_M(MENU_ID) ON DELETE CASCADE
) COMMENT='메뉴 마스터 테이블';
```

## 2. ROLE_MENU_MAP (역할-메뉴 매핑 테이블)

역할(Role)별로 접근 가능한 메뉴를 정의하는 테이블입니다.

```sql
CREATE TABLE ROLE_MENU_MAP (
    ROLE_MENU_MAP_ID VARCHAR(50) PRIMARY KEY,
    ROLE_ID VARCHAR(50) NOT NULL COMMENT '역할 ID',
    MENU_ID VARCHAR(50) NOT NULL COMMENT '메뉴 ID',
    PERMISSION_TYPE VARCHAR(20) DEFAULT 'READ' COMMENT '권한 타입 (READ, WRITE, DELETE, ADMIN)',
    IS_ACTIVE CHAR(1) DEFAULT 'Y' COMMENT '활성화 여부',
    CREATED_AT DATETIME DEFAULT CURRENT_TIMESTAMP,
    UPDATED_AT DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY uk_role_menu (ROLE_ID, MENU_ID),
    INDEX idx_role_id (ROLE_ID),
    INDEX idx_menu_id (MENU_ID),
    FOREIGN KEY (MENU_ID) REFERENCES MENU_M(MENU_ID) ON DELETE CASCADE
) COMMENT='역할-메뉴 매핑 테이블';
```

## 3. ORG_TEAM_MENU_MAP (조직/팀-메뉴 매핑 테이블)

조직 또는 팀별로 접근 가능한 메뉴를 정의하는 테이블입니다.

```sql
CREATE TABLE ORG_TEAM_MENU_MAP (
    ORG_TEAM_MENU_MAP_ID VARCHAR(50) PRIMARY KEY,
    ORG_ID VARCHAR(50) COMMENT '조직 ID (NULL 가능)',
    TEAM_ID VARCHAR(50) COMMENT '팀 ID (NULL 가능)',
    MENU_ID VARCHAR(50) NOT NULL COMMENT '메뉴 ID',
    PERMISSION_TYPE VARCHAR(20) DEFAULT 'READ' COMMENT '권한 타입',
    IS_ACTIVE CHAR(1) DEFAULT 'Y' COMMENT '활성화 여부',
    CREATED_AT DATETIME DEFAULT CURRENT_TIMESTAMP,
    UPDATED_AT DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_org_id (ORG_ID),
    INDEX idx_team_id (TEAM_ID),
    INDEX idx_menu_id (MENU_ID),
    FOREIGN KEY (MENU_ID) REFERENCES MENU_M(MENU_ID) ON DELETE CASCADE
) COMMENT='조직/팀-메뉴 매핑 테이블';
```

## 4. 예시 데이터

### MENU_M 예시 데이터
```sql
INSERT INTO MENU_M VALUES
('MENU_001', '대시보드', '/dashboard', 'DashboardIcon', NULL, 1, 1, 'Y', 'Y', '메인 대시보드'),
('MENU_002', '사용자 관리', '/users', 'UserIcon', NULL, 2, 1, 'Y', 'Y', '사용자 관리 메뉴'),
('MENU_003', '사용자 목록', '/users/list', 'UserListIcon', 'MENU_002', 1, 2, 'Y', 'Y', '사용자 목록 조회'),
('MENU_004', '사용자 등록', '/users/create', 'UserAddIcon', 'MENU_002', 2, 2, 'Y', 'Y', '사용자 등록'),
('MENU_005', '권한 관리', '/roles', 'RoleIcon', NULL, 3, 1, 'Y', 'Y', '권한 관리 메뉴'),
('MENU_006', '조직 관리', '/organizations', 'OrganizationIcon', NULL, 4, 1, 'Y', 'Y', '조직 관리 메뉴'),
('MENU_007', '시스템 설정', '/settings', 'SettingsIcon', NULL, 5, 1, 'Y', 'Y', '시스템 설정');
```

### ROLE_MENU_MAP 예시 데이터
```sql
INSERT INTO ROLE_MENU_MAP VALUES
('RMM_001', 'ROLE_ADMIN', 'MENU_001', 'READ', 'Y', NOW(), NOW()),
('RMM_002', 'ROLE_ADMIN', 'MENU_002', 'ADMIN', 'Y', NOW(), NOW()),
('RMM_003', 'ROLE_ADMIN', 'MENU_005', 'ADMIN', 'Y', NOW(), NOW()),
('RMM_004', 'ROLE_USER', 'MENU_001', 'READ', 'Y', NOW(), NOW()),
('RMM_005', 'ROLE_USER', 'MENU_002', 'READ', 'Y', NOW(), NOW());
```

## 5. 메뉴 조회 쿼리 예시

사용자의 역할과 조직/팀 정보를 기반으로 접근 가능한 메뉴를 조회하는 쿼리:

```sql
SELECT DISTINCT 
    m.MENU_ID,
    m.MENU_NM,
    m.MENU_PATH,
    m.MENU_ICON,
    m.PARENT_MENU_ID,
    m.MENU_ORDER,
    m.MENU_LEVEL,
    COALESCE(rmm.PERMISSION_TYPE, otmm.PERMISSION_TYPE) AS PERMISSION_TYPE
FROM MENU_M m
LEFT JOIN ROLE_MENU_MAP rmm ON m.MENU_ID = rmm.MENU_ID 
    AND rmm.ROLE_ID = ? -- 사용자 역할 ID
    AND rmm.IS_ACTIVE = 'Y'
LEFT JOIN ORG_TEAM_MENU_MAP otmm ON m.MENU_ID = otmm.MENU_ID
    AND (otmm.ORG_ID = ? OR otmm.TEAM_ID = ?) -- 사용자 조직/팀 ID
    AND otmm.IS_ACTIVE = 'Y'
WHERE m.IS_ACTIVE = 'Y' 
    AND m.IS_VISIBLE = 'Y'
    AND (rmm.MENU_ID IS NOT NULL OR otmm.MENU_ID IS NOT NULL)
ORDER BY m.MENU_LEVEL, m.MENU_ORDER;
```

