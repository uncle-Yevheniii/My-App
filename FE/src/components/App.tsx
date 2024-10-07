import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import { Navigate, Route, Routes } from 'react-router-dom'

import { Layout } from './ui/Layout'
import { Loader } from './ui/Loader'
import { ProtectRoute, RedirectRoute } from '@/helpers'
import { userCheckAuth } from '@/store/user/userOperations'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { SignUpPage, LoginPage, EmailVerifyPage, DashboardPage, AboutProjectPage } from '@/pages'

export default function App() {
    const dispatch = useAppDispatch()
    const isLoadingUser = useAppSelector((state) => state.user.isLoadingUser)

    useEffect(() => {
        dispatch(userCheckAuth())
    }, [dispatch])

    if (isLoadingUser) return <Loader />

    return (
        <div className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden">
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<AboutProjectPage />} />
                    <Route path="/signup" element={<RedirectRoute children={<SignUpPage />} />} />
                    <Route path="/login" element={<RedirectRoute children={<LoginPage />} />} />

                    <Route path="/email-verify" element={<EmailVerifyPage />} />

                    <Route path="/dashboard" element={<ProtectRoute children={<DashboardPage />} />} />

                    <Route path="*" element={<Navigate to="/" replace />} />
                </Route>
            </Routes>

            <Toaster />
        </div>
    )
}
