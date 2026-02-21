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
  stats: [],
  reviewsOverTime: [],
  reviewsByCategory: [],
  topProducts: [],
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
