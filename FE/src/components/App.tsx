import { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import { Layout } from './ui/Layout'

import { SignUpPage, LoginPage, EmailVerifyPage, DashboardPage, AboutProjectPage } from '@/pages'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { userCheckAuth } from '@/store/user/userOperations'

//redirect function authenticated user to dashboard page
function RedirectUser({ children }: { children: JSX.Element }) {
    const user = useAppSelector((state) => state.user.userInfo)
    const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated)

    if (isAuthenticated && user?.isVerified) return <Navigate to="/dashboard" replace />
    return children
}

//protect function not-authenticated user to dashboard page
function ProtectRoute({ children }: { children: JSX.Element }) {
    const user = useAppSelector((state) => state.user.userInfo)
    const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated)

    if (!isAuthenticated) return <Navigate to="/login" replace />
    if (!user?.isVerified) return <Navigate to="/email-verify" replace />

    return children
}

export default function App() {
    const dispatch = useAppDispatch()
    const isLoadingUser = useAppSelector((state) => state.user.isLoadingUser)

    useEffect(() => {
        dispatch(userCheckAuth())
    }, [dispatch])

    if (isLoadingUser) return <div>Loading...</div>

    return (
        <div className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden">
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<AboutProjectPage />} />
                    <Route path="/signup" element={<RedirectUser children={<SignUpPage />} />} />
                    <Route path="/login" element={<RedirectUser children={<LoginPage />} />} />

                    <Route path="/email-verify" element={<EmailVerifyPage />} />

                    <Route path="/dashboard" element={<ProtectRoute children={<DashboardPage />} />} />

                    <Route path="*" element={<Navigate to="/" replace />} />
                </Route>
            </Routes>
        </div>
    )
}
