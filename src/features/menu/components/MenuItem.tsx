import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import type { MenuItem as MenuItemType } from '../types/menu.types';

interface MenuItemProps {
  menu: MenuItemType;
  level?: number;
}

export function MenuItem({ menu, level = 0 }: MenuItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const hasChildren = menu.children && menu.children.length > 0;
  const isActive = location.pathname === menu.path;

  return (
    <li>
      <div className={`${level === 0 ? 'mb-2' : 'mb-1.5'}`}>
        <Link
          to={menu.path}
          className={`menu-link ${isActive ? 'active' : ''} ${level > 0 ? 'pl-6 py-2 text-xs' : ''}`}
          onClick={(e) => {
            if (hasChildren) {
              e.preventDefault();
              setIsOpen(!isOpen);
            }
          }}
        >
          <span className={`text-base w-5 text-center flex-shrink-0 menu-icon ${isActive ? 'text-white' : 'text-gray-600'}`}>
            {menu.icon}
          </span>
          <span className={`flex-1 ${isActive ? 'text-white font-semibold' : 'text-gray-800'}`}>
            {menu.title}
          </span>
          {hasChildren && (
            <span className={`text-xs transition-transform duration-200 menu-arrow ${isActive ? 'text-white' : 'text-gray-500'} ${isOpen ? 'rotate-90' : ''}`}>
              ▶
            </span>
          )}
        </Link>
      </div>
      {hasChildren && isOpen && (
        <ul className={`ml-4 mt-1.5 space-y-1.5 ${level === 0 ? 'pl-0' : 'pl-2'} border-l border-gray-300`}>
          {menu.children!.map((child) => (
            <MenuItem key={child.menuId} menu={child} level={level + 1} />
          ))}
        </ul>
      )}
    </li>
  );
}

