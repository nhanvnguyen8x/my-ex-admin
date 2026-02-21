import { useMemo, useState, useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { setCategories, setTags, setAttributes, setLoading } from '@/store/slices/masterDataSlice'
import { Category, MasterDataItem } from '@/store/slices/masterDataSlice'
import { getCategories, getTags, getAttributes } from '@/api/masterData'
import { Tag, Layers, Box } from 'lucide-react'
import { DataTable } from '@/components/DataTable'
import type { ColumnDef } from '@tanstack/react-table'

type TabId = 'categories' | 'tags' | 'attributes'

const tabs: { id: TabId; label: string; icon: React.ElementType }[] = [
  { id: 'categories', label: 'Categories', icon: Layers },
  { id: 'tags', label: 'Tags', icon: Tag },
  { id: 'attributes', label: 'Attributes', icon: Box },
]

const categoryColumns: ColumnDef<Category, unknown>[] = [
  { accessorKey: 'name', header: 'Category', cell: ({ getValue }) => <span className="font-medium text-slate-900">{String(getValue())}</span> },
  { accessorKey: 'slug', header: 'Slug', cell: ({ getValue }) => <span className="text-slate-500 font-mono text-sm">{String(getValue())}</span> },
  { accessorKey: 'productCount', header: 'Products', cell: ({ getValue }) => <span className="text-slate-600 block text-right">{Number(getValue())}</span> },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ getValue }) => (
      <span
        className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
          getValue() === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'
        }`}
      >
        {String(getValue())}
      </span>
    ),
  },
]

function buildMasterDataItemColumns(firstHeader: string): ColumnDef<MasterDataItem, unknown>[] {
  return [
    { accessorKey: 'name', header: firstHeader, cell: ({ getValue }) => <span className="font-medium text-slate-900">{String(getValue())}</span> },
    { accessorKey: 'code', header: 'Code', cell: ({ getValue }) => <span className="text-slate-500 font-mono text-sm">{String(getValue()) ?? '—'}</span> },
    { accessorKey: 'usageCount', header: 'Usage', cell: ({ getValue }) => <span className="text-slate-600 block text-right">{Number(getValue())}</span> },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ getValue }) => (
        <span
          className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
            getValue() === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'
          }`}
        >
          {String(getValue())}
        </span>
      ),
    },
  ]
}

function mapCategory(api: { id: string; name: string; slug: string; productCount?: number; status?: string }): Category {
  return {
    id: api.id,
    name: api.name,
    slug: api.slug,
    productCount: api.productCount ?? 0,
    status: (api.status === 'inactive' ? 'inactive' : 'active') as Category['status'],
  }
}

function mapMasterDataItem(
  api: { id: string; name: string; code?: string; status?: string; usageCount?: number },
  type: MasterDataItem['type']
): MasterDataItem {
  return {
    id: api.id,
    type,
    name: api.name,
    code: api.code,
    status: api.status ?? 'active',
    usageCount: api.usageCount ?? 0,
  }
}

export function MasterData() {
  const dispatch = useAppDispatch()
  const token = useAppSelector((s) => s.auth.token)
  const { categories, tags, attributes, loading } = useAppSelector((s) => s.masterData)
  const [activeTab, setActiveTab] = useState<TabId>('categories')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!token) return
    let cancelled = false
    dispatch(setLoading(true))
    setError(null)
    Promise.all([
      getCategories(token).then((arr) => (cancelled ? [] : arr.map(mapCategory))),
      getTags(token).then((arr) => (cancelled ? [] : arr.map((t) => mapMasterDataItem(t, 'tag')))),
      getAttributes(token).then((arr) => (cancelled ? [] : arr.map((a) => mapMasterDataItem(a, 'attribute')))),
    ])
      .then(([cats, tagItems, attrItems]) => {
        if (cancelled) return
        dispatch(setCategories(cats))
        dispatch(setTags(tagItems))
        dispatch(setAttributes(attrItems))
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load master data')
        }
      })
      .finally(() => {
        if (!cancelled) dispatch(setLoading(false))
      })
    return () => {
      cancelled = true
    }
  }, [token, dispatch])

  const categoryCols = useMemo(() => categoryColumns, [])
  const tagCols = useMemo(() => buildMasterDataItemColumns('Tag'), [])
  const attrCols = useMemo(() => buildMasterDataItemColumns('Attribute'), [])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-slate-900">Master Data</h1>
        <p className="text-slate-600 mt-1">
          Categories, tags, and attributes for your catalog
        </p>
      </div>

      {error && (
        <div className="rounded-lg bg-rose-50 text-rose-800 px-4 py-3 text-sm">
          {error}
        </div>
      )}
      {loading && (
        <div className="text-slate-500 text-sm">Loading master data…</div>
      )}

      <div className="flex gap-2 border-b border-slate-200 pb-2">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === id
                ? 'bg-primary-100 text-primary-700'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      {activeTab === 'categories' && (
        <DataTable columns={categoryCols} data={categories} getRowId={(row) => row.id} defaultPageSize={10} />
      )}
      {activeTab === 'tags' && (
        <DataTable columns={tagCols} data={tags} getRowId={(row) => row.id} defaultPageSize={10} />
      )}
      {activeTab === 'attributes' && (
        <DataTable columns={attrCols} data={attributes} getRowId={(row) => row.id} defaultPageSize={10} />
      )}
    </div>
  )
}
