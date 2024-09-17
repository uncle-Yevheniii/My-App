import { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import { Layout } from './Layout'
import { useAuthenticationStore } from '@/store/authenticationStore'
import { SignUpPage, EmailVerifyPage, DashboardPage } from '@/pages'

export default function App() {
    const ProtectRoute = ({ children }: { children: JSX.Element }) => {
        const user = useAuthenticationStore((state) => state.user)
        const isAuthenticated = useAuthenticationStore((state) => state.isAuthenticated)

        if (!isAuthenticated && !user) return <Navigate to="/login" replace />

        return children
    }
    const RedirectRoute = ({ children }: { children: JSX.Element }) => {
        const user = useAuthenticationStore((state) => state.user)
        const isAuthenticated = useAuthenticationStore((state) => state.isAuthenticated)

        if (isAuthenticated) return <Navigate to="/dashboard" replace />
        if (user) return <Navigate to="/dashboard" replace />

        return children
    }

    // const user = useAuthenticationStore((state) => state.user)
    const checkAuthFunc = useAuthenticationStore((state) => state.checkAuthFunc)
    const isLoading = useAuthenticationStore((state) => state.isLoading)
    // const isAuthenticated = useAuthenticationStore((state) => state.isAuthenticated)

    useEffect(() => {
        checkAuthFunc()
    }, [checkAuthFunc])

    // console.log(isAuthenticated)

    if (isLoading) return <div>Loading...</div>
    return (
        <div>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<div>AboutProject</div>} />
                    <Route path="/signup" element={<RedirectRoute children={<SignUpPage />} />} />
                    <Route path="/login" element={<RedirectRoute children={<div>Login page</div>} />} />
                    <Route path="/email-verify" element={<EmailVerifyPage />} />

                    <Route path="/dashboard" element={<ProtectRoute children={<DashboardPage />} />} />

                    <Route path="*" element={<Navigate to="/" replace />} />
                </Route>
            </Routes>
        </div>
    )
}
