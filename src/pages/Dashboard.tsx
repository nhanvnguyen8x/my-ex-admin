import { useMemo } from 'react'
import { useAppSelector } from '@/store/hooks'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts'
import {
  Users,
  MessageCircle,
  Package,
  Star,
  TrendingUp,
  TrendingDown,
} from 'lucide-react'
import { DataTable } from '@/components/DataTable'
import type { ColumnDef } from '@tanstack/react-table'

const iconMap: Record<string, React.ElementType> = {
  users: Users,
  'message-circle': MessageCircle,
  package: Package,
  star: Star,
}

type TopProduct = { id: string; name: string; reviews: number; rating: number }

export function Dashboard() {
  const { stats, reviewsOverTime, reviewsByCategory, topProducts } =
    useAppSelector((s) => s.dashboard)

  const topProductColumns = useMemo<ColumnDef<TopProduct, unknown>[]>(
    () => [
      {
        id: 'rank',
        header: '#',
        enableSorting: false,
        cell: ({ row }) => <span className="text-slate-500 text-sm">{row.index + 1}</span>,
      },
      {
        accessorKey: 'name',
        header: 'Product',
        cell: ({ getValue }) => <span className="font-medium text-slate-900">{String(getValue())}</span>,
      },
      {
        accessorKey: 'reviews',
        header: 'Reviews',
        cell: ({ getValue }) => <span className="text-slate-600 block text-right">{Number(getValue()).toLocaleString()}</span>,
      },
      {
        id: 'rating',
        accessorFn: (row) => row.rating,
        header: 'Avg. Rating',
        cell: ({ row }) => (
          <span className="inline-flex items-center gap-1 text-amber-600">
            <Star className="w-4 h-4 fill-current" />
            {row.original.rating}
          </span>
        ),
      },
    ],
    []
  )

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-display font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-600 mt-1">Overview of your review platform</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = iconMap[stat.icon] ?? Package
          const isPositive = stat.change >= 0
          return (
            <div
              key={stat.id}
              className="bg-white border border-slate-200 rounded-xl p-5 hover:border-slate-300 transition-colors shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-medium">{stat.title}</p>
                  <p className="text-2xl font-display font-bold text-slate-900 mt-1">
                    {stat.value}
                  </p>
                  <div className="flex items-center gap-1.5 mt-2">
                    {isPositive ? (
                      <TrendingUp className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-rose-600" />
                    )}
                    <span
                      className={`text-sm font-medium ${
                        isPositive ? 'text-emerald-600' : 'text-rose-600'
                      }`}
                    >
                      {isPositive ? '+' : ''}
                      {stat.change}%
                    </span>
                    <span className="text-slate-500 text-sm">{stat.changeLabel}</span>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-primary-600" />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            Reviews over time
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={reviewsOverTime} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                  }}
                  labelStyle={{ color: '#0f172a' }}
                />
                <Line
                  type="monotone"
                  dataKey="reviews"
                  name="Reviews"
                  stroke="#0ea5e9"
                  strokeWidth={2}
                  dot={{ fill: '#0ea5e9', strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            Reviews by category
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={reviewsByCategory}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  labelLine={false}
                >
                  {reviewsByCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill as string} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #334155',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Top products table */}
      <div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-slate-900">Top products by reviews</h3>
          <p className="text-slate-600 text-sm mt-0.5">
            Most reviewed products in the platform
          </p>
        </div>
        <DataTable
          columns={topProductColumns}
          data={topProducts}
          getRowId={(row) => row.id}
          defaultPageSize={5}
          pageSizeOptions={[5, 10, 20]}
        />
      </div>
    </div>
  )
}
