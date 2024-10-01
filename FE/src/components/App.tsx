import { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import { Layout } from './Layout'

import { SignUpPage, LoginPage, EmailVerifyPage, DashboardPage, AboutProjectPage } from '@/pages'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { userCheckAuth } from '@/store/user/userOperations'

export default function App() {
    const dispatch = useAppDispatch()

    // const user = useAppSelector((state) => state.user.user)
    // const isLoadingUser = useAppSelector((state) => state.user.isLoadingUser)

    useEffect(() => {
        dispatch(userCheckAuth())
    }, [dispatch])

    // TODO: Add loader
    // TODO: Normalize restricted and private routes

    // console.log(user, isLoadingUser)

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
