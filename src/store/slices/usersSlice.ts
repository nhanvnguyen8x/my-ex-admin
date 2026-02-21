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

const initialState: UsersState = {
  list: [],
  selectedUser: null,
  loading: false,
  total: 0,
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.list = action.payload
      state.total = action.payload.length
    },
    setUsersWithTotal: (state, action: { payload: { list: UserRecord[]; total: number } }) => {
      state.list = action.payload.list
      state.total = action.payload.total
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

export const { setUsers, setUsersWithTotal, setSelectedUser, updateUser, setLoading } = usersSlice.actions
export default usersSlice.reducer
