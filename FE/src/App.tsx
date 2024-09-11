import { Route, Routes } from 'react-router-dom'
import { LoginPage, SignUpPage, EmailVerifyPage } from './pages'

export default function App() {
    return (
        <div
            className="
    min-h-screen flex items-center justify-center 
    bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900"
        >
            <Routes>
                <Route path="/" element={'Home'} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/email-verify" element={<EmailVerifyPage />} />
            </Routes>
        </div>
    )
}
