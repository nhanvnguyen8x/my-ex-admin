import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test/utils'
import { Permissions } from './Permissions'

describe('Permissions', () => {
  it('renders Permissions heading', () => {
    render(<Permissions />)
    expect(screen.getByRole('heading', { level: 1, name: 'Permissions' })).toBeInTheDocument()
    expect(screen.getByText(/roles and access control/i)).toBeInTheDocument()
  })

  it('renders all permissions table heading', () => {
    render(<Permissions />)
    expect(screen.getByRole('heading', { name: /all permissions/i })).toBeInTheDocument()
  })
})
