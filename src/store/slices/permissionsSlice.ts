import { createSlice } from '@reduxjs/toolkit'

export interface Role {
  id: string
  name: string
  description: string
  permissions: string[]
  userCount: number
}

export interface Permission {
  id: string
  module: string
  action: string
  description: string
}

interface PermissionsState {
  roles: Role[]
  permissions: Permission[]
  loading: boolean
}

const initialState: PermissionsState = {
  roles: [],
  permissions: [],
  loading: false,
}

const permissionsSlice = createSlice({
  name: 'permissions',
  initialState,
  reducers: {
    setRoles: (state, action) => {
      state.roles = action.payload
    },
    setPermissions: (state, action) => {
      state.permissions = action.payload
    },
    updateRole: (state, action) => {
      const idx = state.roles.findIndex((r) => r.id === action.payload.id)
      if (idx !== -1) state.roles[idx] = { ...state.roles[idx], ...action.payload }
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
  },
})

export const { setRoles, setPermissions, updateRole, setLoading } = permissionsSlice.actions
export default permissionsSlice.reducer
