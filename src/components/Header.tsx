import { useAppSelector } from '@/store/hooks'
import { LogOut, User } from 'lucide-react'

export function Header() {
  const user = useAppSelector((s) => s.auth.user)

  return (
    <header className="h-[var(--header-height)] shrink-0 flex items-center justify-between px-6 bg-slate-900/80 border-b border-slate-800 backdrop-blur-sm">
      <div className="flex items-center gap-4">
        <h2 className="text-slate-300 font-medium text-sm hidden sm:block">
          Experience Review Admin
        </h2>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/50">
          <div className="w-8 h-8 rounded-full bg-primary-600/30 flex items-center justify-center">
            <User className="w-4 h-4 text-primary-400" />
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-slate-200">{user?.name}</p>
            <p className="text-xs text-slate-500">{user?.role}</p>
          </div>
        </div>
        <button
          type="button"
          className="p-2 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-colors"
          title="Logout"
          aria-label="Logout"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </header>
  )
}
