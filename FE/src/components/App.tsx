// import { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import { Layout } from './Layout'
import { SignUpPage, LoginPage, EmailVerifyPage } from '@/pages'

export default function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<div>AboutProject</div>} />
                    <Route path="/signup" element={<SignUpPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/email-verify" element={<EmailVerifyPage />} />

                    <Route path="/dashboard" element={<div>Dashboard page</div>} />

                    <Route path="*" element={<Navigate to="/" replace />} />
                </Route>
            </Routes>
        </div>
    )
}
