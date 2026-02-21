import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test/utils'
import { Header } from './Header'

describe('Header', () => {
  it('renders app title', () => {
    render(<Header />)
    expect(screen.getByText('Experience Review Admin')).toBeInTheDocument()
  })

  it('renders logout button', () => {
    render(<Header />)
    const logout = screen.getByRole('button', { name: /log out/i })
    expect(logout).toBeInTheDocument()
  })

})
