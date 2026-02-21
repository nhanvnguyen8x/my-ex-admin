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

const initialState: MasterDataState = {
  categories: [],
  tags: [],
  attributes: [],
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
