/**
 * Build headers for authenticated API requests.
 * Pass token from auth state (e.g. useAppSelector(s => s.auth.token)).
 */
export function authHeaders(token: string | null): HeadersInit {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  }
  if (token) {
    (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`
  }
  return headers
}

export async function handleJsonResponse<T>(res: Response): Promise<T> {
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    const message = (data as { error?: string })?.error ?? (data as { message?: string })?.message ?? res.statusText ?? 'Request failed'
    throw new Error(message)
  }
  return data as T
}
