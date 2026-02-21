import { authHeaders, handleJsonResponse } from './client'

const MASTER_DATA_API_URL = import.meta.env.VITE_MASTER_DATA_API_URL ?? 'http://localhost:3003'

/** Category as returned by master-data-service (camelCase). */
export interface CategoryApi {
  id: string
  name: string
  slug: string
  productCount?: number
  status: string
}

/** Tag/attribute item from master-data-service. */
export interface MasterDataItemApi {
  id: string
  type?: string
  name: string
  code?: string
  status: string
  usageCount?: number
}

async function fetchList<T>(token: string | null, path: string): Promise<T[]> {
  const res = await fetch(`${MASTER_DATA_API_URL}${path}`, {
    method: 'GET',
    headers: authHeaders(token),
  })
  const data = await handleJsonResponse<T[] | { data: T[] }>(res)
  return Array.isArray(data) ? data : (data as { data: T[] }).data ?? []
}

export async function getCategories(token: string | null): Promise<CategoryApi[]> {
  return fetchList<CategoryApi>(token, '/categories')
}

export async function getTags(token: string | null): Promise<MasterDataItemApi[]> {
  return fetchList<MasterDataItemApi>(token, '/tags')
}

export async function getAttributes(token: string | null): Promise<MasterDataItemApi[]> {
  return fetchList<MasterDataItemApi>(token, '/attributes')
}
