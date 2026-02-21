import { useMemo, useState, useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { setUsersWithTotal, setLoading } from '@/store/slices/usersSlice'
import { UserRecord } from '@/store/slices/usersSlice'
import { listUsers, mapUserToRecord } from '@/api/users'
import { Search, MoreVertical, Mail, Calendar } from 'lucide-react'
import { DataTable } from '@/components/DataTable'
import type { ColumnDef } from '@tanstack/react-table'

const statusStyles: Record<UserRecord['status'], string> = {
  active: 'bg-emerald-100 text-emerald-700',
  inactive: 'bg-slate-100 text-slate-600',
  suspended: 'bg-rose-100 text-rose-700',
}

export function Users() {
  const dispatch = useAppDispatch()
  const token = useAppSelector((s) => s.auth.token)
  const { list, loading } = useAppSelector((s) => s.users)
  const [search, setSearch] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!token) return
    let cancelled = false
    dispatch(setLoading(true))
    setError(null)
    listUsers(token, { search, page: 1, limit: 100 })
      .then((res) => {
        if (cancelled) return
        const records = res.data.map(mapUserToRecord)
        dispatch(setUsersWithTotal({ list: records, total: res.pagination.total }))
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load users')
          dispatch(setUsersWithTotal({ list: [], total: 0 }))
        }
      })
      .finally(() => {
        if (!cancelled) dispatch(setLoading(false))
      })
    return () => {
      cancelled = true
    }
  }, [token, search, dispatch])

  const filtered = useMemo(
    () =>
      list.filter(
        (u) =>
          u.name.toLowerCase().includes(searchInput.toLowerCase()) ||
          u.email.toLowerCase().includes(searchInput.toLowerCase())
      ),
    [list, searchInput]
  )

  const columns = useMemo<ColumnDef<UserRecord, unknown>[]>(
    () => [
      {
        id: 'user',
        accessorFn: (row) => row.name,
        header: 'User',
        cell: ({ row }) => {
          const u = row.original
          return (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-semibold">
                {u.name ? u.name.charAt(0) : u.email.charAt(0)}
              </div>
              <div>
                <p className="font-medium text-slate-900">{u.name || '—'}</p>
                <p className="text-sm text-slate-500 flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5" />
                  {u.email}
                </p>
              </div>
            </div>
          )
        },
      },
      {
        accessorKey: 'role',
        header: 'Role',
        cell: ({ getValue }) => (
          <span className="text-slate-600 capitalize">{String(getValue())}</span>
        ),
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ getValue }) => (
          <span
            className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium capitalize ${statusStyles[getValue() as UserRecord['status']]}`}
          >
            {String(getValue())}
          </span>
        ),
      },
      {
        accessorKey: 'joinedAt',
        header: 'Joined',
        cell: ({ getValue }) => (
          <span className="text-slate-500 text-sm flex items-center gap-1 w-fit">
            <Calendar className="w-4 h-4" />
            {String(getValue())}
          </span>
        ),
      },
      {
        accessorKey: 'reviewCount',
        header: 'Reviews',
        meta: { align: 'right' },
        cell: ({ getValue }) => (
          <span className="text-slate-600 block text-right">{Number(getValue())}</span>
        ),
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
          <h1 className="text-2xl font-display font-bold text-slate-900">Users</h1>
          <p className="text-slate-600 mt-1">Manage platform users and roles</p>
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="search"
            placeholder="Search users..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && setSearch(searchInput)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500"
          />
          <button
            type="button"
            onClick={() => setSearch(searchInput)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-primary-600 hover:text-primary-700"
          >
            Search
          </button>
        </div>
      </div>

      {error && (
        <div className="rounded-lg bg-rose-50 text-rose-800 px-4 py-3 text-sm">
          {error}
        </div>
      )}
      {loading && (
        <div className="text-slate-500 text-sm">Loading users…</div>
      )}

      <DataTable
        columns={columns}
        data={filtered}
        getRowId={(row) => row.id}
        defaultPageSize={10}
      />
    </div>
  )
}
