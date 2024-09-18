import { Navigate } from 'react-router-dom'

import { useAuthenticationStore } from '@/store/authenticationStore'

export default function ProtectRoute({ children }: { children: JSX.Element }) {
    const user = useAuthenticationStore((state) => state.user)
    const isAuthenticated = useAuthenticationStore((state) => state.isAuthenticated)

    if (!isAuthenticated && !user) return <Navigate to="/login" replace />
    return children
}
