import { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import { Layout } from './Layout'
// import { RedirectRoute, ProtectRoute } from '@/helpers'
import { useAuthenticationStore } from '@/store/authenticationStore'
import { SignUpPage, LoginPage, EmailVerifyPage, DashboardPage, AboutProjectPage } from '@/pages'

export default function App() {
    const checkAuthFunc = useAuthenticationStore((state) => state.checkAuthFunc)
    // const user = useAuthenticationStore((state) => state.user)
    // console.log(user)
    useEffect(() => {
        checkAuthFunc()
    }, [checkAuthFunc])

    // TODO: Add loader
    return (
        <div>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<AboutProjectPage />} />
                    <Route path="/signup" element={<SignUpPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/email-verify" element={<EmailVerifyPage />} />

                    <Route path="/dashboard" element={<DashboardPage />} />

                    <Route path="*" element={<Navigate to="/" replace />} />
                </Route>
            </Routes>
        </div>
    )
}
