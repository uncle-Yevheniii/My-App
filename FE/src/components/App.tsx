import { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import { Layout } from './Layout'
import { RedirectRoute, ProtectRoute } from '@/helpers'
import { SignUpPage, LoginPage, EmailVerifyPage } from '@/pages'
import { useAuthenticationStore } from '@/store/authenticationStore'

export default function App() {
    const checkAuthFunc = useAuthenticationStore((state) => state.checkAuthFunc)

    useEffect(() => {
        checkAuthFunc()
    }, [checkAuthFunc])

    // TODO: Add loader
    return (
        <div>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<div>AboutProject</div>} />
                    <Route path="/signup" element={<RedirectRoute children={<SignUpPage />} />} />
                    <Route path="/login" element={<RedirectRoute children={<LoginPage />} />} />
                    <Route path="/email-verify" element={<EmailVerifyPage />} />

                    <Route path="/dashboard" element={<ProtectRoute children={<div>Dashboard</div>} />} />

                    <Route path="*" element={<Navigate to="/" replace />} />
                </Route>
            </Routes>
        </div>
    )
}
