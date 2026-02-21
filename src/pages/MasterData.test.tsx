import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@/test/utils'
import userEvent from '@testing-library/user-event'
import * as masterDataApi from '@/api/masterData'
import { MasterData } from './MasterData'

vi.mock('@/api/masterData', () => ({
  getCategories: vi.fn(),
  getTags: vi.fn(),
  getAttributes: vi.fn(),
}))
const mockGetCategories = vi.mocked(masterDataApi.getCategories)
const mockGetTags = vi.mocked(masterDataApi.getTags)
const mockGetAttributes = vi.mocked(masterDataApi.getAttributes)

const authenticatedState = {
  auth: {
    user: { id: '1', username: 'admin' },
    token: 'token',
    isAuthenticated: true,
  },
}

describe('MasterData', () => {
  beforeEach(() => {
    mockGetCategories.mockResolvedValue([])
    mockGetTags.mockResolvedValue([])
    mockGetAttributes.mockResolvedValue([])
  })

  it('renders Master Data heading and tabs', () => {
    render(<MasterData />, { preloadedState: authenticatedState })
    expect(screen.getByRole('heading', { name: /master data/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /categories/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /tags/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /attributes/i })).toBeInTheDocument()
  })

  it('fetches categories, tags, attributes when authenticated', () => {
    render(<MasterData />, { preloadedState: authenticatedState })
    expect(mockGetCategories).toHaveBeenCalledWith('token')
    expect(mockGetTags).toHaveBeenCalledWith('token')
    expect(mockGetAttributes).toHaveBeenCalledWith('token')
  })

  it('switches tab when clicking Tags', async () => {
    const user = userEvent.setup()
    render(<MasterData />, { preloadedState: authenticatedState })
    await user.click(screen.getByRole('button', { name: /^tags$/i }))
    expect(screen.getByRole('button', { name: /^tags$/i })).toHaveClass('bg-primary-100')
  })
})
