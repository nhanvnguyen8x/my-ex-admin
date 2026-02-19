import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import dashboardReducer from './slices/dashboardSlice'
import usersReducer from './slices/usersSlice'
import productsReducer from './slices/productsSlice'
import masterDataReducer from './slices/masterDataSlice'
import permissionsReducer from './slices/permissionsSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
    users: usersReducer,
    products: productsReducer,
    masterData: masterDataReducer,
    permissions: permissionsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
