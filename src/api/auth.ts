const AUTH_API_URL = import.meta.env.VITE_AUTH_API_URL ?? 'http://localhost:3001'

export interface AuthUser {
  id: string
  username: string
}

export interface AuthResponse {
  user: AuthUser
  token: string
}

export interface AuthError {
  statusCode: number
  message: string
}

async function handleResponse<T>(res: Response): Promise<T> {
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error((data as AuthError).message ?? res.statusText ?? 'Request failed')
  }
  return data as T
}

export async function login(username: string, password: string): Promise<AuthResponse> {
  const res = await fetch(`${AUTH_API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: username.trim(), password }),
  })
  return handleResponse<AuthResponse>(res)
}

export async function register(username: string, password: string): Promise<AuthResponse> {
  const res = await fetch(`${AUTH_API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: username.trim(), password }),
  })
  return handleResponse<AuthResponse>(res)
}
