import { Toaster } from 'react-hot-toast'
import { Loader } from 'lucide-react'
import { Navigate, Route, Routes } from 'react-router-dom'

import { Routes as Path } from './routes'
import { useAuthStore } from './store/authStore'
import { LoginPage, SignUpPage, DashboardPage, ResetPasswordPage, ForgotPasswordPage, EmailVerificationPage } from './pages'
import { useEffect } from 'react'

// protect routes that require authentication
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const user = useAuthStore((state) => state.user)
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

    if (!isAuthenticated) return <Navigate to="/login" replace />
    if (!user?.isVerified) return <Navigate to="/verify-email" replace />

    return children
}

// redirect authenticated users to the home page
const RedirectAuthenticatedUser = ({ children }: { children: JSX.Element }) => {
    const user = useAuthStore((state) => state.user)
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

    if (isAuthenticated && user?.isVerified) return <Navigate to="/" replace />

    return children
}

export default function App() {
    const isCheckingAuth = useAuthStore((state) => state.isCheckingAuth)
    const checkAuth = useAuthStore((state) => state.checkAuth)

    useEffect(() => {
        checkAuth()
    }, [checkAuth])

    if (isCheckingAuth) return <Loader className=" animate-spin mx-auto" size={48} />

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden">
            <Routes>
                <Route path={Path.DASHBOARD} element={<ProtectedRoute children={<DashboardPage />} />} />
                <Route path={Path.LOGIN} element={<RedirectAuthenticatedUser children={<LoginPage />} />} />
                <Route path={Path.SIGNUP} element={<RedirectAuthenticatedUser children={<SignUpPage />} />} />

                <Route path={Path.EMAIL_VERIFICATION} element={<RedirectAuthenticatedUser children={<EmailVerificationPage />} />} />

                <Route path={Path.FORGOT_PASSWORD} element={<RedirectAuthenticatedUser children={<ForgotPasswordPage />} />} />
                <Route path={Path.RESET_PASSWORD} element={<RedirectAuthenticatedUser children={<ResetPasswordPage />} />} />
                <Route />

                <Route path={'*'} element={<Navigate to={Path.DASHBOARD} replace />} />
            </Routes>

            <Toaster />
        </div>
    )
}
