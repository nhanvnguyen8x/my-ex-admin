import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@/test/utils'
import userEvent from '@testing-library/user-event'
import * as authApi from '@/api/auth'
import { SignIn } from './SignIn'

vi.mock('@/api/auth', () => ({ login: vi.fn() }))
const mockLogin = vi.mocked(authApi.login)

describe('SignIn', () => {
  beforeEach(() => {
    mockLogin.mockReset()
  })

  it('renders sign in form', () => {
    render(<SignIn />)
    expect(screen.getByRole('heading', { name: /sign in/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /sign up/i })).toHaveAttribute('href', '/sign-up')
  })

  it('shows validation error when submitting empty', async () => {
    const user = userEvent.setup()
    render(<SignIn />)
    await user.click(screen.getByRole('button', { name: /sign in/i }))
    expect(screen.getByText(/username and password are required/i)).toBeInTheDocument()
    expect(mockLogin).not.toHaveBeenCalled()
  })

  it('calls login and navigates on success', async () => {
    const user = userEvent.setup()
    mockLogin.mockResolvedValueOnce({
      user: { id: '1', username: 'admin' },
      token: 'jwt-token',
    })
    render(<SignIn />, { initialEntries: ['/sign-in'] })
    await user.type(screen.getByLabelText(/username/i), 'admin')
    await user.type(screen.getByLabelText(/password/i), 'password')
    await user.click(screen.getByRole('button', { name: /sign in/i }))
    expect(mockLogin).toHaveBeenCalledWith('admin', 'password')
  })

  it('shows error when login fails', async () => {
    const user = userEvent.setup()
    mockLogin.mockRejectedValueOnce(new Error('Invalid credentials'))
    render(<SignIn />)
    await user.type(screen.getByLabelText(/username/i), 'admin')
    await user.type(screen.getByLabelText(/password/i), 'wrong')
    await user.click(screen.getByRole('button', { name: /sign in/i }))
    await expect(screen.findByText(/invalid credentials/i)).resolves.toBeInTheDocument()
  })
})
