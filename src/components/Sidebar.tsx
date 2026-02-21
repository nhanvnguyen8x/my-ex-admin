import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Users,
  Package,
  Database,
  Shield,
} from 'lucide-react'

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/users', icon: Users, label: 'Users' },
  { to: '/products', icon: Package, label: 'Products' },
  { to: '/master-data', icon: Database, label: 'Master Data' },
  { to: '/permissions', icon: Shield, label: 'Permissions' },
]

export function Sidebar() {
  return (
    <aside
      className="w-[var(--sidebar-width)] shrink-0 bg-white border-r border-slate-200 flex flex-col"
      aria-label="Sidebar"
    >
      <div className="p-5 border-b border-slate-200">
        <h1 className="font-display font-bold text-lg text-slate-900 tracking-tight">
          Experience Review
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">Admin Panel</p>
      </div>
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`
            }
          >
            <Icon className="w-5 h-5 shrink-0" aria-hidden />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
