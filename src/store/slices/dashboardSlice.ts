import { createSlice } from '@reduxjs/toolkit'

export interface StatCard {
  id: string
  title: string
  value: string | number
  change: number
  changeLabel: string
  icon: string
}

export interface ChartDataPoint {
  name: string
  value?: number
  [key: string]: string | number | undefined
}

interface DashboardState {
  stats: StatCard[]
  reviewsOverTime: ChartDataPoint[]
  reviewsByCategory: ChartDataPoint[]
  topProducts: { id: string; name: string; reviews: number; rating: number }[]
  loading: boolean
}

const initialState: DashboardState = {
  loading: false,
  stats: [
    { id: '1', title: 'Total Users', value: '12,847', change: 12.5, changeLabel: 'vs last month', icon: 'users' },
    { id: '2', title: 'Total Reviews', value: '48,291', change: 8.2, changeLabel: 'vs last month', icon: 'message-circle' },
    { id: '3', title: 'Products', value: '2,341', change: -2.1, changeLabel: 'vs last month', icon: 'package' },
    { id: '4', title: 'Avg. Rating', value: '4.6', change: 0.3, changeLabel: 'vs last month', icon: 'star' },
  ],
  reviewsOverTime: [
    { name: 'Jan', reviews: 3200, rating: 4.5 },
    { name: 'Feb', reviews: 3800, rating: 4.6 },
    { name: 'Mar', reviews: 4100, rating: 4.5 },
    { name: 'Apr', reviews: 4500, rating: 4.7 },
    { name: 'May', reviews: 5200, rating: 4.6 },
    { name: 'Jun', reviews: 6100, rating: 4.8 },
  ],
  reviewsByCategory: [
    { name: 'Electronics', value: 12400, fill: '#0ea5e9' },
    { name: 'Fashion', value: 9800, fill: '#8b5cf6' },
    { name: 'Home', value: 7600, fill: '#10b981' },
    { name: 'Sports', value: 5200, fill: '#f59e0b' },
    { name: 'Other', value: 13191, fill: '#64748b' },
  ],
  topProducts: [
    { id: '1', name: 'Wireless Headphones Pro', reviews: 2847, rating: 4.8 },
    { id: '2', name: 'Smart Watch Series X', reviews: 1923, rating: 4.6 },
    { id: '3', name: 'Organic Skincare Set', reviews: 1654, rating: 4.9 },
    { id: '4', name: 'Running Shoes Ultra', reviews: 1432, rating: 4.5 },
    { id: '5', name: 'Coffee Maker Deluxe', reviews: 1201, rating: 4.7 },
  ],
}

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setStats: (state, action) => {
      state.stats = action.payload
    },
    setReviewsOverTime: (state, action) => {
      state.reviewsOverTime = action.payload
    },
    setReviewsByCategory: (state, action) => {
      state.reviewsByCategory = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
  },
})

export const { setStats, setReviewsOverTime, setReviewsByCategory, setLoading } = dashboardSlice.actions
export default dashboardSlice.reducer
