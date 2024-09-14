import { Navigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'

// protect routes that require authentication
export function ProtectedRoute({ children }: { children: JSX.Element }) {
    const user = useAuthStore((state) => state.user)
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

    if (!isAuthenticated) return <Navigate to="/login" replace />
    if (!user?.isVerified) return <Navigate to="/verify-email" replace />

    return children
}

// redirect authenticated users to the home page
export function RedirectAuthenticatedUser({ children }: { children: JSX.Element }) {
    const user = useAuthStore((state) => state.user)
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

    if (isAuthenticated && user?.isVerified) return <Navigate to="/dashboard" replace />

    return children
}
