import { Navigate } from 'react-router-dom'
import { useAppSelector } from '@/store/hooks'

//protect function not-authenticated user to dashboard page
export default function ProtectRoute({ children }: { children: JSX.Element }) {
    const user = useAppSelector((state) => state.user.userInfo)
    const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated)

    if (!isAuthenticated) return <Navigate to="/login" replace />
    if (!user?.isVerified) return <Navigate to="/email-verify" replace />

    return children
}
