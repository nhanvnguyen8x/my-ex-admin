import { createSlice } from '@reduxjs/toolkit'

export interface UserRecord {
  id: string
  email: string
  name: string
  role: string
  status: 'active' | 'inactive' | 'suspended'
  joinedAt: string
  reviewCount: number
}

interface UsersState {
  list: UserRecord[]
  selectedUser: UserRecord | null
  loading: boolean
  total: number
}

const mockUsers: UserRecord[] = [
  { id: '1', email: 'john@example.com', name: 'John Doe', role: 'user', status: 'active', joinedAt: '2024-01-15', reviewCount: 24 },
  { id: '2', email: 'jane@example.com', name: 'Jane Smith', role: 'user', status: 'active', joinedAt: '2024-02-20', reviewCount: 18 },
  { id: '3', email: 'bob@example.com', name: 'Bob Wilson', role: 'moderator', status: 'active', joinedAt: '2024-03-10', reviewCount: 0 },
  { id: '4', email: 'alice@example.com', name: 'Alice Brown', role: 'user', status: 'inactive', joinedAt: '2024-01-08', reviewCount: 5 },
  { id: '5', email: 'charlie@example.com', name: 'Charlie Davis', role: 'user', status: 'suspended', joinedAt: '2024-04-01', reviewCount: 12 },
]

const initialState: UsersState = {
  list: mockUsers,
  selectedUser: null,
  loading: false,
  total: mockUsers.length,
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.list = action.payload
      state.total = action.payload.length
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload
    },
    updateUser: (state, action) => {
      const idx = state.list.findIndex((u) => u.id === action.payload.id)
      if (idx !== -1) state.list[idx] = { ...state.list[idx], ...action.payload }
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
  },
})

export const { setUsers, setSelectedUser, updateUser, setLoading } = usersSlice.actions
export default usersSlice.reducer
