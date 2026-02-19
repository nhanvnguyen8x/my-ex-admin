import { createSlice } from '@reduxjs/toolkit'

export interface Product {
  id: string
  name: string
  category: string
  sku: string
  status: 'active' | 'draft' | 'archived'
  reviewCount: number
  avgRating: number
  updatedAt: string
}

interface ProductsState {
  list: Product[]
  selectedProduct: Product | null
  loading: boolean
  total: number
}

const mockProducts: Product[] = [
  { id: '1', name: 'Wireless Headphones Pro', category: 'Electronics', sku: 'WH-PRO-001', status: 'active', reviewCount: 2847, avgRating: 4.8, updatedAt: '2024-06-01' },
  { id: '2', name: 'Smart Watch Series X', category: 'Electronics', sku: 'SW-X-002', status: 'active', reviewCount: 1923, avgRating: 4.6, updatedAt: '2024-06-02' },
  { id: '3', name: 'Organic Skincare Set', category: 'Beauty', sku: 'OSS-003', status: 'active', reviewCount: 1654, avgRating: 4.9, updatedAt: '2024-05-28' },
  { id: '4', name: 'Running Shoes Ultra', category: 'Sports', sku: 'RSU-004', status: 'active', reviewCount: 1432, avgRating: 4.5, updatedAt: '2024-05-30' },
  { id: '5', name: 'Coffee Maker Deluxe', category: 'Home', sku: 'CMD-005', status: 'draft', reviewCount: 0, avgRating: 0, updatedAt: '2024-06-05' },
]

const initialState: ProductsState = {
  list: mockProducts,
  selectedProduct: null,
  loading: false,
  total: mockProducts.length,
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.list = action.payload
      state.total = action.payload.length
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload
    },
    updateProduct: (state, action) => {
      const idx = state.list.findIndex((p) => p.id === action.payload.id)
      if (idx !== -1) state.list[idx] = { ...state.list[idx], ...action.payload }
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
  },
})

export const { setProducts, setSelectedProduct, updateProduct, setLoading } = productsSlice.actions
export default productsSlice.reducer
