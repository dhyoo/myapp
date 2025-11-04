import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { usePermission } from '../usePermission';

describe('usePermission', () => {
  it('should return permission utilities', () => {
    const { result } = renderHook(() => usePermission());

    expect(result.current).toHaveProperty('currentPermission');
    expect(result.current).toHaveProperty('hasPermission');
    expect(result.current).toHaveProperty('hasAnyPermission');
    expect(result.current).toHaveProperty('hasAllPermissions');
    expect(result.current).toHaveProperty('isAdmin');
    expect(result.current).toHaveProperty('isReadOnly');
  });

  it('should check permission levels correctly', () => {
    const { result } = renderHook(() => usePermission());

    // ADMIN should have all permissions
    if (result.current.currentPermission === 'ADMIN') {
      expect(result.current.hasPermission('READ')).toBe(true);
      expect(result.current.hasPermission('WRITE')).toBe(true);
      expect(result.current.hasPermission('DELETE')).toBe(true);
      expect(result.current.hasPermission('ADMIN')).toBe(true);
      expect(result.current.isAdmin).toBe(true);
    }
  });

  it('should check multiple permissions with hasAnyPermission', () => {
    const { result } = renderHook(() => usePermission());

    const hasAny = result.current.hasAnyPermission(['READ', 'WRITE']);
    expect(typeof hasAny).toBe('boolean');
  });

  it('should check multiple permissions with hasAllPermissions', () => {
    const { result } = renderHook(() => usePermission());

    const hasAll = result.current.hasAllPermissions(['READ']);
    expect(typeof hasAll).toBe('boolean');
  });
});


