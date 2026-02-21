import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test/utils'
import { Dashboard } from './Dashboard'

describe('Dashboard', () => {
  it('renders dashboard heading', () => {
    render(<Dashboard />)
    expect(screen.getByRole('heading', { name: /dashboard/i })).toBeInTheDocument()
    expect(screen.getByText(/overview of your review platform/i)).toBeInTheDocument()
  })

  it('renders reviews over time and top products sections', () => {
    render(<Dashboard />)
    expect(screen.getByText(/reviews over time/i)).toBeInTheDocument()
    expect(screen.getByText(/top products by reviews/i)).toBeInTheDocument()
  })
})
