import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test/utils'
import { Products } from './Products'

describe('Products', () => {
  it('renders Products heading', () => {
    render(<Products />)
    expect(screen.getByRole('heading', { name: /products/i })).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/search products/i)).toBeInTheDocument()
  })

  it('shows empty state when no products', () => {
    render(<Products />)
    expect(screen.getByText('No data')).toBeInTheDocument()
  })
})
