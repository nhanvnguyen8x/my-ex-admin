import { useMemo } from 'react'
import { useAppSelector } from '@/store/hooks'
import { Permission, Role } from '@/store/slices/permissionsSlice'
import { Shield, Users, Check, Minus } from 'lucide-react'
import { DataTable } from '@/components/DataTable'
import type { ColumnDef } from '@tanstack/react-table'

export function Permissions() {
  const { roles, permissions } = useAppSelector((s) => s.permissions)

  const columns = useMemo<ColumnDef<Permission, unknown>[]>(
    () => [
      { accessorKey: 'module', header: 'Module', cell: ({ getValue }) => <span className="font-medium text-slate-900">{String(getValue())}</span> },
      { accessorKey: 'action', header: 'Action', cell: ({ getValue }) => <span className="text-slate-600">{String(getValue())}</span> },
      { accessorKey: 'description', header: 'Description', cell: ({ getValue }) => <span className="text-slate-500">{String(getValue())}</span> },
    ],
    []
  )

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-display font-bold text-slate-900">Permissions</h1>
        <p className="text-slate-600 mt-1">Roles and access control</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {roles.map((role: Role) => (
          <div
            key={role.id}
            className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm"
          >
            <div className="p-5 border-b border-slate-200 flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">{role.name}</h3>
                <p className="text-sm text-slate-600">{role.description}</p>
                <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" />
                  {role.userCount} users
                </p>
              </div>
            </div>
            <div className="p-5">
              <p className="text-slate-600 text-sm font-medium mb-3">Permissions</p>
              <ul className="space-y-2">
                {permissions.map((perm: Permission) => {
                  const hasAccess = role.permissions.includes(perm.id)
                  return (
                    <li
                      key={perm.id}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="text-slate-700">
                        {perm.module} — {perm.action}
                      </span>
                      {hasAccess ? (
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      ) : (
                        <Minus className="w-4 h-4 text-slate-300 shrink-0" />
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-slate-900">All permissions</h3>
          <p className="text-slate-600 text-sm mt-0.5">
            Reference list of available permissions
          </p>
        </div>
        <DataTable
          columns={columns}
          data={permissions}
          getRowId={(row) => row.id}
          defaultPageSize={10}
        />
      </div>
    </div>
  )
}
