import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test/utils'
import { Layout } from './Layout'

describe('Layout', () => {
  it('renders Sidebar and Header', () => {
    render(<Layout />)
    expect(screen.getByRole('complementary', { name: 'Sidebar' })).toBeInTheDocument()
    expect(screen.getByRole('banner')).toBeInTheDocument()
  })

  it('renders main content area for Outlet', () => {
    render(<Layout />)
    const main = screen.getByRole('main')
    expect(main).toBeInTheDocument()
  })
})
