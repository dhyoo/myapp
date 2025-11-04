import { create } from 'zustand';
import type { MenuItem } from '../types/menu.types';

// persist 미들웨어는 선택사항입니다. 필요시 설치: npm install zustand
// import { persist } from 'zustand/middleware';

interface MenuState {
  menus: MenuItem[];
  filteredMenus: MenuItem[];
  isLoading: boolean;
  error: Error | null;
  lastFetched: number | null;
  setMenus: (menus: MenuItem[]) => void;
  setFilteredMenus: (menus: MenuItem[]) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: Error | null) => void;
  clearMenus: () => void;
}

const CACHE_DURATION = 5 * 60 * 1000; // 5분

export const useMenuStore = create<MenuState>((set: (partial: Partial<MenuState> | ((state: MenuState) => Partial<MenuState>)) => void) => ({
  menus: [],
  filteredMenus: [],
  isLoading: false,
  error: null,
  lastFetched: null,
  setMenus: (menus: MenuItem[]) =>
    set({
      menus,
      lastFetched: Date.now(),
      error: null,
    }),
  setFilteredMenus: (filteredMenus: MenuItem[]) => set({ filteredMenus }),
  setLoading: (isLoading: boolean) => set({ isLoading }),
  setError: (error: Error | null) => set({ error }),
  clearMenus: () =>
    set({
      menus: [],
      filteredMenus: [],
      lastFetched: null,
      error: null,
    }),
}));

// persist 미들웨어를 사용하려면 아래 코드로 대체:
// import { persist } from 'zustand/middleware';
// export const useMenuStore = create<MenuState>()(
//   persist(
//     (set) => ({ ... }),
//     {
//       name: 'menu-storage',
//       partialize: (state) => ({
//         menus: state.menus,
//         lastFetched: state.lastFetched,
//       }),
//     }
//   )
// );

/**
 * 캐시가 유효한지 확인
 */
export function isMenuCacheValid(): boolean {
  const state = useMenuStore.getState();
  if (!state.lastFetched) return false;
  return Date.now() - state.lastFetched < CACHE_DURATION;
}

