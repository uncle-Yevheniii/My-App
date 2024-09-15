import { Loader } from './components'
import { lazy, useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import { Navigate, Route, Routes } from 'react-router-dom'

import Layout from './Layout'

import { useAuthStore } from './store/authStore'
import { ProtectedRoute, RedirectAuthenticatedUser } from './helpers/RouteHelpers'

const HomePage = lazy(() => import('./pages/PageHome'))
const LoginPage = lazy(() => import('./pages/PageLogin'))
const SignUpPage = lazy(() => import('./pages/PageSignUp'))
const DashboardPage = lazy(() => import('./pages/PageDashboard'))
const EmailVerificationPage = lazy(() => import('./pages/PageEmailVerification'))
const ForgotPasswordPage = lazy(() => import('./pages/PageForgotPassword'))
const ResetPasswordPage = lazy(() => import('./pages/PageResetPassword'))

export default function App() {
    const isCheckingAuth = useAuthStore((state) => state.isCheckingAuth)
    const checkAuth = useAuthStore((state) => state.checkAuth)

    useEffect(() => {
        checkAuth()
    }, [checkAuth])

    if (isCheckingAuth) return <Loader />

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center flex-col relative overflow-hidden">
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<RedirectAuthenticatedUser children={<HomePage />} />} />

                    <Route path="/login" element={<RedirectAuthenticatedUser children={<LoginPage />} />} />
                    <Route path="/signup" element={<RedirectAuthenticatedUser children={<SignUpPage />} />} />

                    <Route path="/dashboard" element={<ProtectedRoute children={<DashboardPage />} />} />

                    <Route path="/verify-email" element={<RedirectAuthenticatedUser children={<EmailVerificationPage />} />} />

                    <Route path="/forgot-password" element={<RedirectAuthenticatedUser children={<ForgotPasswordPage />} />} />
                    <Route path="/reset-password/:token" element={<RedirectAuthenticatedUser children={<ResetPasswordPage />} />} />
                </Route>

                <Route path={'*'} element={<Navigate to={'/home'} replace />} />
            </Routes>

            <Toaster />
        </div>
    )
}
