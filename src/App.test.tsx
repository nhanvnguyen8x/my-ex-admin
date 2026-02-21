import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test/utils'
import App from './App'

describe('App', () => {
  it('renders sign-in when not authenticated', () => {
    render(<App />, { initialEntries: ['/'] })
    expect(screen.getByRole('heading', { name: /sign in/i })).toBeInTheDocument()
  })

  it('renders sign-in page at /sign-in', () => {
    render(<App />, { initialEntries: ['/sign-in'] })
    expect(screen.getByRole('heading', { name: /sign in/i })).toBeInTheDocument()
  })

  it('renders sign-up page at /sign-up', () => {
    render(<App />, { initialEntries: ['/sign-up'] })
    expect(screen.getByRole('heading', { name: /sign up/i })).toBeInTheDocument()
  })
})
