import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test/utils'
import { Sidebar } from './Sidebar'

describe('Sidebar', () => {
  it('renders branding', () => {
    render(<Sidebar />)
    expect(screen.getByText('Experience Review')).toBeInTheDocument()
    expect(screen.getByText('Admin Panel')).toBeInTheDocument()
  })

  it('renders nav links', () => {
    render(<Sidebar />)
    expect(screen.getByRole('link', { name: /dashboard/i })).toHaveAttribute('href', '/dashboard')
    expect(screen.getByRole('link', { name: /users/i })).toHaveAttribute('href', '/users')
    expect(screen.getByRole('link', { name: /products/i })).toHaveAttribute('href', '/products')
    expect(screen.getByRole('link', { name: /master data/i })).toHaveAttribute('href', '/master-data')
    expect(screen.getByRole('link', { name: /permissions/i })).toHaveAttribute('href', '/permissions')
  })

  it('has sidebar aria label', () => {
    render(<Sidebar />)
    expect(screen.getByRole('complementary', { name: 'Sidebar' })).toBeInTheDocument()
  })
})
