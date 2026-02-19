import { createSlice } from '@reduxjs/toolkit'

export interface Category {
  id: string
  name: string
  slug: string
  productCount: number
  status: 'active' | 'inactive'
}

export interface MasterDataItem {
  id: string
  type: 'category' | 'tag' | 'attribute'
  name: string
  code?: string
  status: string
  usageCount: number
}

interface MasterDataState {
  categories: Category[]
  tags: MasterDataItem[]
  attributes: MasterDataItem[]
  loading: boolean
}

const mockCategories: Category[] = [
  { id: '1', name: 'Electronics', slug: 'electronics', productCount: 342, status: 'active' },
  { id: '2', name: 'Fashion', slug: 'fashion', productCount: 521, status: 'active' },
  { id: '3', name: 'Home & Garden', slug: 'home-garden', productCount: 198, status: 'active' },
  { id: '4', name: 'Sports', slug: 'sports', productCount: 156, status: 'active' },
  { id: '5', name: 'Beauty', slug: 'beauty', productCount: 234, status: 'inactive' },
]

const mockTags: MasterDataItem[] = [
  { id: '1', type: 'tag', name: 'Best Seller', code: 'best-seller', status: 'active', usageCount: 89 },
  { id: '2', type: 'tag', name: 'New Arrival', code: 'new-arrival', status: 'active', usageCount: 124 },
  { id: '3', type: 'tag', name: 'Eco Friendly', code: 'eco-friendly', status: 'active', usageCount: 56 },
]

const mockAttributes: MasterDataItem[] = [
  { id: '1', type: 'attribute', name: 'Color', code: 'color', status: 'active', usageCount: 1200 },
  { id: '2', type: 'attribute', name: 'Size', code: 'size', status: 'active', usageCount: 1150 },
  { id: '3', type: 'attribute', name: 'Material', code: 'material', status: 'active', usageCount: 890 },
]

const initialState: MasterDataState = {
  categories: mockCategories,
  tags: mockTags,
  attributes: mockAttributes,
  loading: false,
}

const masterDataSlice = createSlice({
  name: 'masterData',
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload
    },
    setTags: (state, action) => {
      state.tags = action.payload
    },
    setAttributes: (state, action) => {
      state.attributes = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
  },
})

export const { setCategories, setTags, setAttributes, setLoading } = masterDataSlice.actions
export default masterDataSlice.reducer
