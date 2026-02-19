import { useAppSelector } from '@/store/hooks'
import { Product } from '@/store/slices/productsSlice'
import { Search, Package, Star, MoreVertical } from 'lucide-react'
import { useState } from 'react'

const statusStyles: Record<Product['status'], string> = {
  active: 'bg-emerald-500/20 text-emerald-400',
  draft: 'bg-amber-500/20 text-amber-400',
  archived: 'bg-slate-500/20 text-slate-400',
}

export function Products() {
  const { list } = useAppSelector((s) => s.products)
  const [search, setSearch] = useState('')

  const filtered = list.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-white">Products</h1>
          <p className="text-slate-400 mt-1">Manage products and their reviews</p>
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="search"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500"
          />
        </div>
      </div>

      <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700/50">
                <th className="text-left py-3 px-5 text-slate-400 font-medium text-sm">
                  Product
                </th>
                <th className="text-left py-3 px-5 text-slate-400 font-medium text-sm">
                  Category
                </th>
                <th className="text-left py-3 px-5 text-slate-400 font-medium text-sm">
                  SKU
                </th>
                <th className="text-left py-3 px-5 text-slate-400 font-medium text-sm">
                  Status
                </th>
                <th className="text-right py-3 px-5 text-slate-400 font-medium text-sm">
                  Reviews
                </th>
                <th className="text-right py-3 px-5 text-slate-400 font-medium text-sm">
                  Rating
                </th>
                <th className="w-12 py-3 px-2" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((product) => (
                <tr
                  key={product.id}
                  className="border-b border-slate-700/30 hover:bg-slate-800/50 transition-colors"
                >
                  <td className="py-3 px-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-slate-700 flex items-center justify-center">
                        <Package className="w-5 h-5 text-slate-400" />
                      </div>
                      <p className="font-medium text-slate-200">{product.name}</p>
                    </div>
                  </td>
                  <td className="py-3 px-5 text-slate-400">{product.category}</td>
                  <td className="py-3 px-5 text-slate-500 font-mono text-sm">
                    {product.sku}
                  </td>
                  <td className="py-3 px-5">
                    <span
                      className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium capitalize ${statusStyles[product.status]}`}
                    >
                      {product.status}
                    </span>
                  </td>
                  <td className="py-3 px-5 text-right text-slate-300">
                    {product.reviewCount.toLocaleString()}
                  </td>
                  <td className="py-3 px-5 text-right">
                    {product.avgRating > 0 ? (
                      <span className="inline-flex items-center gap-1 text-amber-400">
                        <Star className="w-4 h-4 fill-current" />
                        {product.avgRating}
                      </span>
                    ) : (
                      <span className="text-slate-500">—</span>
                    )}
                  </td>
                  <td className="py-3 px-2">
                    <button
                      type="button"
                      className="p-2 rounded-lg text-slate-400 hover:bg-slate-700 hover:text-slate-200"
                      aria-label="Actions"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="py-12 text-center text-slate-500">
            No products match your search.
          </div>
        )}
      </div>
    </div>
  )
}
