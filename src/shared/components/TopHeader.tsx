import { useState } from 'react';
import type { PermissionType } from '@/shared/types/common.types';

interface TopHeaderProps {
  userPermission: PermissionType;
  onPermissionChange: (permission: PermissionType) => void;
}

export function TopHeader({ userPermission, onPermissionChange }: TopHeaderProps) {

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-300 shadow-md z-50">
      <div className="h-full flex items-center justify-between px-6">
        {/* 왼쪽: 로고 */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-primary-600 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h1 className="text-lg font-bold text-gray-900">
              관리자 메뉴 시스템
            </h1>
          </div>
        </div>

        {/* 오른쪽: 권한 선택 및 사용자 정보 */}
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700 hidden sm:inline">
              권한:
            </span>
            <select
              value={userPermission}
              onChange={(e) => onPermissionChange(e.target.value as PermissionType)}
              className="px-3 py-1.5 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-700 hover:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
            >
              <option value="READ">READ</option>
              <option value="WRITE">WRITE</option>
              <option value="DELETE">DELETE</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          </label>
          <div className="flex items-center gap-2 px-2 py-1.5 rounded-md border border-gray-300 bg-white">
            <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-white font-semibold text-xs">
              U
            </div>
            <span className="text-sm font-medium text-gray-700 hidden md:inline">사용자</span>
          </div>
        </div>
      </div>
    </header>
  );
}

