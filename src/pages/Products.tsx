import { useMemo, useState } from 'react'
import { useAppSelector } from '@/store/hooks'
import { Product } from '@/store/slices/productsSlice'
import { Search, Package, Star, MoreVertical } from 'lucide-react'
import { DataTable } from '@/components/DataTable'
import type { ColumnDef } from '@tanstack/react-table'

const statusStyles: Record<Product['status'], string> = {
  active: 'bg-emerald-100 text-emerald-700',
  draft: 'bg-amber-100 text-amber-700',
  archived: 'bg-slate-100 text-slate-600',
}

export function Products() {
  const { list } = useAppSelector((s) => s.products)
  const [search, setSearch] = useState('')

  const filtered = useMemo(
    () =>
      list.filter(
        (p) =>
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.sku.toLowerCase().includes(search.toLowerCase()) ||
          p.category.toLowerCase().includes(search.toLowerCase())
      ),
    [list, search]
  )

  const columns = useMemo<ColumnDef<Product, unknown>[]>(
    () => [
      {
        id: 'product',
        accessorFn: (row) => row.name,
        header: 'Product',
        cell: ({ row }) => {
          const p = row.original
          return (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
                <Package className="w-5 h-5 text-slate-500" />
              </div>
              <p className="font-medium text-slate-900">{p.name}</p>
            </div>
          )
        },
      },
      { accessorKey: 'category', header: 'Category', cell: ({ getValue }) => <span className="text-slate-600">{String(getValue())}</span> },
      {
        accessorKey: 'sku',
        header: 'SKU',
        cell: ({ getValue }) => (
          <span className="text-slate-500 font-mono text-sm">{String(getValue())}</span>
        ),
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ getValue }) => (
          <span
            className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium capitalize ${statusStyles[getValue() as Product['status']]}`}
          >
            {String(getValue())}
          </span>
        ),
      },
      {
        accessorKey: 'reviewCount',
        header: 'Reviews',
        cell: ({ getValue }) => (
          <span className="text-slate-600 block text-right">
            {Number(getValue()).toLocaleString()}
          </span>
        ),
      },
      {
        id: 'rating',
        accessorFn: (row) => row.avgRating,
        header: 'Rating',
        cell: ({ row }) => {
          const p = row.original
          return p.avgRating > 0 ? (
            <span className="inline-flex items-center gap-1 text-amber-600">
              <Star className="w-4 h-4 fill-current" />
              {p.avgRating}
            </span>
          ) : (
            <span className="text-slate-400">—</span>
          )
        },
      },
      {
        id: 'actions',
        header: '',
        enableSorting: false,
        cell: () => (
          <button
            type="button"
            className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700"
            aria-label="Actions"
          >
            <MoreVertical className="w-4 h-4" />
          </button>
        ),
      },
    ],
    []
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-slate-900">Products</h1>
          <p className="text-slate-600 mt-1">Manage products and their reviews</p>
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="search"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500"
          />
        </div>
      </div>

      <DataTable
        columns={columns}
        data={filtered}
        getRowId={(row) => row.id}
        defaultPageSize={10}
      />
    </div>
  )
}
