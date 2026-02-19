import { useAppSelector } from '@/store/hooks'
import { Role, Permission } from '@/store/slices/permissionsSlice'
import { Shield, Users, Check, Minus } from 'lucide-react'

export function Permissions() {
  const { roles, permissions } = useAppSelector((s) => s.permissions)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-display font-bold text-white">Permissions</h1>
        <p className="text-slate-400 mt-1">Roles and access control</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {roles.map((role: Role) => (
          <div
            key={role.id}
            className="bg-slate-800/60 border border-slate-700/50 rounded-xl overflow-hidden"
          >
            <div className="p-5 border-b border-slate-700/50 flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary-600/20 flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary-400" />
              </div>
              <div>
                <h3 className="font-semibold text-white">{role.name}</h3>
                <p className="text-sm text-slate-400">{role.description}</p>
                <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" />
                  {role.userCount} users
                </p>
              </div>
            </div>
            <div className="p-5">
              <p className="text-slate-400 text-sm font-medium mb-3">Permissions</p>
              <ul className="space-y-2">
                {permissions.map((perm: Permission) => {
                  const hasAccess = role.permissions.includes(perm.id)
                  return (
                    <li
                      key={perm.id}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="text-slate-300">
                        {perm.module} — {perm.action}
                      </span>
                      {hasAccess ? (
                        <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                      ) : (
                        <Minus className="w-4 h-4 text-slate-600 shrink-0" />
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl overflow-hidden">
        <div className="p-5 border-b border-slate-700/50">
          <h3 className="text-lg font-semibold text-white">All permissions</h3>
          <p className="text-slate-400 text-sm mt-0.5">
            Reference list of available permissions
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700/50">
                <th className="text-left py-3 px-5 text-slate-400 font-medium text-sm">
                  Module
                </th>
                <th className="text-left py-3 px-5 text-slate-400 font-medium text-sm">
                  Action
                </th>
                <th className="text-left py-3 px-5 text-slate-400 font-medium text-sm">
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              {permissions.map((perm) => (
                <tr
                  key={perm.id}
                  className="border-b border-slate-700/30 hover:bg-slate-800/50"
                >
                  <td className="py-3 px-5 font-medium text-slate-200">
                    {perm.module}
                  </td>
                  <td className="py-3 px-5 text-slate-400">{perm.action}</td>
                  <td className="py-3 px-5 text-slate-500">{perm.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
