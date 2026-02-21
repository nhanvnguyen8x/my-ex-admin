import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@/test/utils'
import * as usersApi from '@/api/users'
import { Users } from './Users'

vi.mock('@/api/users', () => ({
  listUsers: vi.fn(),
  mapUserToRecord: (u: { id: string; email: string; name: string | null; createdAt: string; role: string; status: string; reviewCount: number }) => ({
    id: u.id,
    email: u.email,
    name: u.name ?? '',
    role: u.role,
    status: u.status,
    joinedAt: u.createdAt,
    reviewCount: u.reviewCount,
  }),
}))
const mockListUsers = vi.mocked(usersApi.listUsers)

const authenticatedState = {
  auth: {
    user: { id: '1', username: 'admin' },
    token: 'token',
    isAuthenticated: true,
  },
}

describe('Users', () => {
  beforeEach(() => {
    mockListUsers.mockReset()
    mockListUsers.mockResolvedValue({
      data: [
        {
          id: '1',
          email: 'u@example.com',
          name: 'Test User',
          role: 'user',
          status: 'active',
          avatar: null,
          reviewCount: 0,
          createdAt: '2025-01-01T00:00:00Z',
          updatedAt: null,
        },
      ],
      pagination: { page: 1, limit: 10, total: 1, totalPages: 1 },
    })
  })

  it('renders Users heading and search', () => {
    render(<Users />, { preloadedState: authenticatedState })
    expect(screen.getByRole('heading', { name: /users/i })).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/search users/i)).toBeInTheDocument()
  })

  it('fetches and displays users when authenticated', async () => {
    render(<Users />, { preloadedState: authenticatedState })
    expect(mockListUsers).toHaveBeenCalledWith('token', expect.objectContaining({ page: 1, limit: 100 }))
    expect(await screen.findByText('Test User')).toBeInTheDocument()
  })

  it('does not fetch when not authenticated', () => {
    render(<Users />)
    expect(mockListUsers).not.toHaveBeenCalled()
  })
})
