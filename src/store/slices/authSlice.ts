import { createSlice } from '@reduxjs/toolkit'

const AUTH_STORAGE_KEY = 'my-ex-admin-auth'

export interface User {
  id: string
  username: string
}

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
}

function loadStored(): { user: User | null; token: string | null } {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY)
    if (!raw) return { user: null, token: null }
    const { user, token } = JSON.parse(raw) as { user: User; token: string }
    if (user?.id && token) return { user, token }
  } catch {
    // ignore
  }
  return { user: null, token: null }
}

const stored = loadStored()

const initialState: AuthState = {
  user: stored.user,
  token: stored.token,
  isAuthenticated: !!stored.token,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: { payload: { user: User; token: string } }) => {
      state.user = action.payload.user
      state.token = action.payload.token
      state.isAuthenticated = true
      try {
        localStorage.setItem(
          AUTH_STORAGE_KEY,
          JSON.stringify({ user: action.payload.user, token: action.payload.token })
        )
      } catch {
        // ignore
      }
    },
    logout: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      try {
        localStorage.removeItem(AUTH_STORAGE_KEY)
      } catch {
        // ignore
      }
    },
  },
})

export const { setAuth, logout } = authSlice.actions
export default authSlice.reducer
