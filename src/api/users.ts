import { authHeaders, handleJsonResponse } from './client'

const USER_API_URL = import.meta.env.VITE_USER_API_URL ?? 'http://localhost:3002'

export interface UserListParams {
  search?: string
  status?: string
  role?: string
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export interface UserApiRecord {
  id: string
  email: string
  name: string | null
  role: string
  status: string
  avatar: string | null
  reviewCount: number
  createdAt: string
  updatedAt: string | null
}

export interface UserListResponse {
  data: UserApiRecord[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

/** Map API user to UI UserRecord (joinedAt from createdAt). */
export function mapUserToRecord(u: UserApiRecord) {
  return {
    id: u.id,
    email: u.email,
    name: u.name ?? '',
    role: u.role,
    status: u.status as 'active' | 'inactive' | 'suspended',
    joinedAt: u.createdAt,
    reviewCount: u.reviewCount,
  }
}

export async function listUsers(token: string | null, params: UserListParams = {}): Promise<UserListResponse> {
  const sp = new URLSearchParams()
  if (params.search) sp.set('search', params.search)
  if (params.status) sp.set('status', params.status)
  if (params.role) sp.set('role', params.role)
  if (params.page != null) sp.set('page', String(params.page))
  if (params.limit != null) sp.set('limit', String(params.limit))
  if (params.sortBy) sp.set('sortBy', params.sortBy)
  if (params.sortOrder) sp.set('sortOrder', params.sortOrder)
  const qs = sp.toString()
  const url = `${USER_API_URL}/users${qs ? `?${qs}` : ''}`
  const res = await fetch(url, {
    method: 'GET',
    headers: authHeaders(token),
  })
  return handleJsonResponse<UserListResponse>(res)
}
