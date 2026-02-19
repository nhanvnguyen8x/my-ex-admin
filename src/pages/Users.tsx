import { useAppSelector } from '@/store/hooks'
import { UserRecord } from '@/store/slices/usersSlice'
import { Search, MoreVertical, Mail, Calendar } from 'lucide-react'
import { useState } from 'react'

const statusStyles: Record<UserRecord['status'], string> = {
  active: 'bg-emerald-500/20 text-emerald-400',
  inactive: 'bg-slate-500/20 text-slate-400',
  suspended: 'bg-rose-500/20 text-rose-400',
}

export function Users() {
  const { list } = useAppSelector((s) => s.users)
  const [search, setSearch] = useState('')

  const filtered = list.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-white">Users</h1>
          <p className="text-slate-400 mt-1">Manage platform users and roles</p>
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="search"
            placeholder="Search users..."
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
                  User
                </th>
                <th className="text-left py-3 px-5 text-slate-400 font-medium text-sm">
                  Role
                </th>
                <th className="text-left py-3 px-5 text-slate-400 font-medium text-sm">
                  Status
                </th>
                <th className="text-left py-3 px-5 text-slate-400 font-medium text-sm">
                  Joined
                </th>
                <th className="text-right py-3 px-5 text-slate-400 font-medium text-sm">
                  Reviews
                </th>
                <th className="w-12 py-3 px-2" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-slate-700/30 hover:bg-slate-800/50 transition-colors"
                >
                  <td className="py-3 px-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary-600/20 flex items-center justify-center text-primary-400 font-semibold">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-slate-200">{user.name}</p>
                        <p className="text-sm text-slate-500 flex items-center gap-1">
                          <Mail className="w-3.5 h-3.5" />
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-5">
                    <span className="text-slate-300 capitalize">{user.role}</span>
                  </td>
                  <td className="py-3 px-5">
                    <span
                      className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium capitalize ${statusStyles[user.status]}`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="py-3 px-5 text-slate-400 text-sm flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {user.joinedAt}
                  </td>
                  <td className="py-3 px-5 text-right text-slate-300">
                    {user.reviewCount}
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
            No users match your search.
          </div>
        )}
      </div>
    </div>
  )
}
