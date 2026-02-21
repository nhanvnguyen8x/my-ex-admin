import { useMemo, useState } from 'react'
import { useAppSelector } from '@/store/hooks'
import { Category, MasterDataItem } from '@/store/slices/masterDataSlice'
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
    { accessorKey: 'code', header: 'Code', cell: ({ getValue }) => <span className="text-slate-500 font-mono text-sm">{String(getValue())}</span> },
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

export function MasterData() {
  const { categories, tags, attributes } = useAppSelector((s) => s.masterData)
  const [activeTab, setActiveTab] = useState<TabId>('categories')

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
