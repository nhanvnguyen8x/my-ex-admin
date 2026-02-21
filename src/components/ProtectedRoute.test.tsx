import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test/utils'
import type { RootState } from '@/store'
import { ProtectedRoute } from './ProtectedRoute'

const authenticatedState: Partial<RootState> = {
  auth: {
    user: { id: '1', username: 'admin' },
    token: 'fake-token',
    isAuthenticated: true,
  },
}

describe('ProtectedRoute', () => {
  it('renders children when authenticated', () => {
    render(
      <ProtectedRoute>
        <span>Protected content</span>
      </ProtectedRoute>,
      { initialEntries: ['/dashboard'], preloadedState: authenticatedState }
    )
    expect(screen.getByText('Protected content')).toBeInTheDocument()
  })

  it('does not render children when not authenticated', () => {
    render(
      <ProtectedRoute>
        <span>Protected content</span>
      </ProtectedRoute>,
      { initialEntries: ['/dashboard'] }
    )
    expect(screen.queryByText('Protected content')).not.toBeInTheDocument()
  })
})
