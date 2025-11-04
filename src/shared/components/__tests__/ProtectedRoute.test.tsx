import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import '@testing-library/jest-dom';
import { ProtectedRoute } from '../ProtectedRoute';

// Mock usePermission hook
vi.mock('@/shared/hooks/usePermission', () => ({
  usePermission: () => ({
    hasPermission: (perm: string) => perm === 'READ',
    currentPermission: 'READ',
  }),
}));

describe('ProtectedRoute', () => {
  it('should render children when permission is granted', () => {
    render(
      <BrowserRouter>
        <ProtectedRoute requiredPermission="READ">
          <div>Protected Content</div>
        </ProtectedRoute>
      </BrowserRouter>
    );

    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });

  it('should render fallback when permission is denied', () => {
    render(
      <BrowserRouter>
        <ProtectedRoute requiredPermission="WRITE" fallback={<div>Access Denied</div>}>
          <div>Protected Content</div>
        </ProtectedRoute>
      </BrowserRouter>
    );

    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
    expect(screen.getByText('Access Denied')).toBeInTheDocument();
  });
});


