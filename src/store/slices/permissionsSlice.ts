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

const mockPermissions: Permission[] = [
  { id: '1', module: 'Users', action: 'view', description: 'View users list' },
  { id: '2', module: 'Users', action: 'edit', description: 'Edit user details' },
  { id: '3', module: 'Users', action: 'delete', description: 'Delete users' },
  { id: '4', module: 'Products', action: 'view', description: 'View products' },
  { id: '5', module: 'Products', action: 'edit', description: 'Edit products' },
  { id: '6', module: 'Reviews', action: 'moderate', description: 'Moderate reviews' },
  { id: '7', module: 'Dashboard', action: 'view', description: 'View dashboard' },
  { id: '8', module: 'Settings', action: 'manage', description: 'Manage settings' },
]

const mockRoles: Role[] = [
  { id: '1', name: 'Admin', description: 'Full access', permissions: ['1', '2', '3', '4', '5', '6', '7', '8'], userCount: 3 },
  { id: '2', name: 'Moderator', description: 'Can moderate content', permissions: ['1', '4', '6', '7'], userCount: 12 },
  { id: '3', name: 'Support', description: 'View and respond', permissions: ['1', '4', '7'], userCount: 25 },
  { id: '4', name: 'Viewer', description: 'Read only', permissions: ['1', '4', '7'], userCount: 100 },
]

const initialState: PermissionsState = {
  roles: mockRoles,
  permissions: mockPermissions,
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
