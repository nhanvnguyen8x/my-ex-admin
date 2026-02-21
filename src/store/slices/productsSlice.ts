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

const initialState: ProductsState = {
  list: [],
  selectedProduct: null,
  loading: false,
  total: 0,
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
