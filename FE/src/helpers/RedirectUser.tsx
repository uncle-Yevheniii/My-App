import { Navigate } from 'react-router-dom'
import { useAppSelector } from '@/store/hooks'

//redirect function authenticated user to dashboard page
export default function RedirectUser({ children }: { children: JSX.Element }) {
    const user = useAppSelector((state) => state.user.userInfo)
    const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated)

    if (isAuthenticated && user?.isVerified) return <Navigate to="/dashboard" replace />
    return children
}
