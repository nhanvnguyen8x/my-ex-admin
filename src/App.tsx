import { Routes, Route, Navigate } from 'react-router-dom'
import { Layout } from '@/components/Layout'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { SignIn } from '@/pages/SignIn'
import { SignUp } from '@/pages/SignUp'
import { Dashboard } from '@/pages/Dashboard'
import { Users } from '@/pages/Users'
import { Products } from '@/pages/Products'
import { MasterData } from '@/pages/MasterData'
import { Permissions } from '@/pages/Permissions'
import { useAppSelector } from '@/store/hooks'

function App() {
  const isAuthenticated = useAppSelector((s) => s.auth.isAuthenticated)

  return (
    <Routes>
      <Route path="/sign-in" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <SignIn />} />
      <Route path="/sign-up" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <SignUp />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="products" element={<Products />} />
        <Route path="master-data" element={<MasterData />} />
        <Route path="permissions" element={<Permissions />} />
      </Route>
      <Route path="*" element={<Navigate to={isAuthenticated ? '/dashboard' : '/sign-in'} replace />} />
    </Routes>
  )
}

export default App
