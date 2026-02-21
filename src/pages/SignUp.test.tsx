import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@/test/utils'
import userEvent from '@testing-library/user-event'
import * as authApi from '@/api/auth'
import { SignUp } from './SignUp'

vi.mock('@/api/auth', () => ({ register: vi.fn() }))
const mockRegister = vi.mocked(authApi.register)

describe('SignUp', () => {
  beforeEach(() => {
    mockRegister.mockReset()
  })

  it('renders sign up form', () => {
    render(<SignUp />)
    expect(screen.getByRole('heading', { name: /sign up/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /sign in/i })).toHaveAttribute('href', '/sign-in')
  })

  it('shows error when passwords do not match', async () => {
    const user = userEvent.setup()
    render(<SignUp />)
    await user.type(screen.getByLabelText(/username/i), 'newuser')
    await user.type(screen.getByLabelText(/^password/i), 'password1')
    await user.type(screen.getByLabelText(/confirm password/i), 'password2')
    await user.click(screen.getByRole('button', { name: /sign up/i }))
    expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument()
    expect(mockRegister).not.toHaveBeenCalled()
  })
})
