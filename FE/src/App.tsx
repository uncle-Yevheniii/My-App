import { Toaster } from 'react-hot-toast'
import { Navigate, Route, Routes } from 'react-router-dom'

import { LoginPage, SignUpPage, EmailVerifyPage, HomePage } from './pages'
import { useAuthenticationStore } from './store/authentication.store'
import { useEffect } from 'react'

// protect routes that require authentication
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const { isAuthenticated, user } = useAuthenticationStore()

    if (!isAuthenticated) return <Navigate to="/login" replace />
    if (!user?.isVerified) return <Navigate to="/email-verify" replace />

    return children
}

// redirect authenticated users to the home page
function RedirectAuthenticatedUser({ children }: { children: JSX.Element }) {
    const { isAuthenticated, user } = useAuthenticationStore()

    if (isAuthenticated && user?.isVerified) return <Navigate to="/" replace />

    return children
}

export default function App() {
    // store functions
    const { isCheckingAuthentication, checkAuthentication } = useAuthenticationStore()

    useEffect(() => {
        checkAuthentication()
            .then(() => {})
            .catch((error) => console.log(error))
    }, [checkAuthentication])

    // console.log(useAuthenticationStore())

    if (isCheckingAuthentication) return <div>Loading...</div>
    return (
        <div
            className="
    min-h-screen flex items-center justify-center 
    bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900"
        >
            <Routes>
                <Route path="/" element={ProtectedRoute({ children: <HomePage /> })} />
                <Route path="/signup" element={RedirectAuthenticatedUser({ children: <SignUpPage /> })} />
                <Route path="/login" element={RedirectAuthenticatedUser({ children: <LoginPage /> })} />
                <Route path="/email-verify" element={<EmailVerifyPage />} />
            </Routes>

            <Toaster />
        </div>
    )
}
