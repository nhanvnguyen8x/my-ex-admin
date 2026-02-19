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

const iconMap: Record<string, React.ElementType> = {
  users: Users,
  'message-circle': MessageCircle,
  package: Package,
  star: Star,
}

export function Dashboard() {
  const { stats, reviewsOverTime, reviewsByCategory, topProducts } =
    useAppSelector((s) => s.dashboard)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-display font-bold text-white">Dashboard</h1>
        <p className="text-slate-400 mt-1">Overview of your review platform</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = iconMap[stat.icon] ?? Package
          const isPositive = stat.change >= 0
          return (
            <div
              key={stat.id}
              className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-5 hover:border-slate-600/50 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-slate-400 text-sm font-medium">{stat.title}</p>
                  <p className="text-2xl font-display font-bold text-white mt-1">
                    {stat.value}
                  </p>
                  <div className="flex items-center gap-1.5 mt-2">
                    {isPositive ? (
                      <TrendingUp className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-rose-500" />
                    )}
                    <span
                      className={`text-sm font-medium ${
                        isPositive ? 'text-emerald-400' : 'text-rose-400'
                      }`}
                    >
                      {isPositive ? '+' : ''}
                      {stat.change}%
                    </span>
                    <span className="text-slate-500 text-sm">{stat.changeLabel}</span>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-xl bg-primary-600/20 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-primary-400" />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-5">
          <h3 className="text-lg font-semibold text-white mb-4">
            Reviews over time
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={reviewsOverTime} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #334155',
                    borderRadius: '8px',
                  }}
                  labelStyle={{ color: '#e2e8f0' }}
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

        <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-5">
          <h3 className="text-lg font-semibold text-white mb-4">
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
      <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl overflow-hidden">
        <div className="p-5 border-b border-slate-700/50">
          <h3 className="text-lg font-semibold text-white">Top products by reviews</h3>
          <p className="text-slate-400 text-sm mt-0.5">
            Most reviewed products in the platform
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700/50">
                <th className="text-left py-3 px-5 text-slate-400 font-medium text-sm">
                  #
                </th>
                <th className="text-left py-3 px-5 text-slate-400 font-medium text-sm">
                  Product
                </th>
                <th className="text-right py-3 px-5 text-slate-400 font-medium text-sm">
                  Reviews
                </th>
                <th className="text-right py-3 px-5 text-slate-400 font-medium text-sm">
                  Avg. Rating
                </th>
              </tr>
            </thead>
            <tbody>
              {topProducts.map((product, index) => (
                <tr
                  key={product.id}
                  className="border-b border-slate-700/30 hover:bg-slate-800/50 transition-colors"
                >
                  <td className="py-3 px-5 text-slate-500 text-sm">{index + 1}</td>
                  <td className="py-3 px-5 text-slate-200 font-medium">
                    {product.name}
                  </td>
                  <td className="py-3 px-5 text-right text-slate-300">
                    {product.reviews.toLocaleString()}
                  </td>
                  <td className="py-3 px-5 text-right">
                    <span className="inline-flex items-center gap-1 text-amber-400">
                      <Star className="w-4 h-4 fill-current" />
                      {product.rating}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
