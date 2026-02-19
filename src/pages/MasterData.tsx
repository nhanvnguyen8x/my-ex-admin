import { useAppSelector } from '@/store/hooks'
import { Category, MasterDataItem } from '@/store/slices/masterDataSlice'
import { Tag, Layers, Box } from 'lucide-react'
import { useState } from 'react'

type TabId = 'categories' | 'tags' | 'attributes'

const tabs: { id: TabId; label: string; icon: React.ElementType }[] = [
  { id: 'categories', label: 'Categories', icon: Layers },
  { id: 'tags', label: 'Tags', icon: Tag },
  { id: 'attributes', label: 'Attributes', icon: Box },
]

export function MasterData() {
  const { categories, tags, attributes } = useAppSelector((s) => s.masterData)
  const [activeTab, setActiveTab] = useState<TabId>('categories')

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-white">Master Data</h1>
        <p className="text-slate-400 mt-1">
          Categories, tags, and attributes for your catalog
        </p>
      </div>

      <div className="flex gap-2 border-b border-slate-700 pb-2">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === id
                ? 'bg-primary-600/20 text-primary-400'
                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl overflow-hidden">
        {activeTab === 'categories' && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700/50">
                  <th className="text-left py-3 px-5 text-slate-400 font-medium text-sm">
                    Category
                  </th>
                  <th className="text-left py-3 px-5 text-slate-400 font-medium text-sm">
                    Slug
                  </th>
                  <th className="text-right py-3 px-5 text-slate-400 font-medium text-sm">
                    Products
                  </th>
                  <th className="text-left py-3 px-5 text-slate-400 font-medium text-sm">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {categories.map((cat: Category) => (
                  <tr
                    key={cat.id}
                    className="border-b border-slate-700/30 hover:bg-slate-800/50"
                  >
                    <td className="py-3 px-5 font-medium text-slate-200">
                      {cat.name}
                    </td>
                    <td className="py-3 px-5 text-slate-500 font-mono text-sm">
                      {cat.slug}
                    </td>
                    <td className="py-3 px-5 text-right text-slate-300">
                      {cat.productCount}
                    </td>
                    <td className="py-3 px-5">
                      <span
                        className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                          cat.status === 'active'
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : 'bg-slate-500/20 text-slate-400'
                        }`}
                      >
                        {cat.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'tags' && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700/50">
                  <th className="text-left py-3 px-5 text-slate-400 font-medium text-sm">
                    Tag
                  </th>
                  <th className="text-left py-3 px-5 text-slate-400 font-medium text-sm">
                    Code
                  </th>
                  <th className="text-right py-3 px-5 text-slate-400 font-medium text-sm">
                    Usage
                  </th>
                  <th className="text-left py-3 px-5 text-slate-400 font-medium text-sm">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {tags.map((item: MasterDataItem) => (
                  <tr
                    key={item.id}
                    className="border-b border-slate-700/30 hover:bg-slate-800/50"
                  >
                    <td className="py-3 px-5 font-medium text-slate-200">
                      {item.name}
                    </td>
                    <td className="py-3 px-5 text-slate-500 font-mono text-sm">
                      {item.code}
                    </td>
                    <td className="py-3 px-5 text-right text-slate-300">
                      {item.usageCount}
                    </td>
                    <td className="py-3 px-5">
                      <span
                        className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                          item.status === 'active'
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : 'bg-slate-500/20 text-slate-400'
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'attributes' && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700/50">
                  <th className="text-left py-3 px-5 text-slate-400 font-medium text-sm">
                    Attribute
                  </th>
                  <th className="text-left py-3 px-5 text-slate-400 font-medium text-sm">
                    Code
                  </th>
                  <th className="text-right py-3 px-5 text-slate-400 font-medium text-sm">
                    Usage
                  </th>
                  <th className="text-left py-3 px-5 text-slate-400 font-medium text-sm">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {attributes.map((item: MasterDataItem) => (
                  <tr
                    key={item.id}
                    className="border-b border-slate-700/30 hover:bg-slate-800/50"
                  >
                    <td className="py-3 px-5 font-medium text-slate-200">
                      {item.name}
                    </td>
                    <td className="py-3 px-5 text-slate-500 font-mono text-sm">
                      {item.code}
                    </td>
                    <td className="py-3 px-5 text-right text-slate-300">
                      {item.usageCount}
                    </td>
                    <td className="py-3 px-5">
                      <span
                        className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                          item.status === 'active'
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : 'bg-slate-500/20 text-slate-400'
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
