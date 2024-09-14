import { useState } from 'react'
import { motion } from 'framer-motion'
import { Lock, Loader } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'

import toast from 'react-hot-toast'

import { Input, Title } from '../components'
import { useAuthStore } from '../store/authStore'
export default function ResetPasswordPage() {
    //local state
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')

    //store
    const resetPassword = useAuthStore((state) => state.resetPassword)
    const error = useAuthStore((state) => state.error)
    const isLoading = useAuthStore((state) => state.isLoading)
    const message = useAuthStore((state) => state.message)

    //hook
    const navigate = useNavigate()
    const { token } = useParams<string>()

    //handlers
    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault()

        if (password !== confirmPassword) return alert('Passwords do not match')

        await resetPassword(token!, password)
            .then(() => {
                toast.success('Password reset successfully, redirecting to login page...')
                setTimeout(() => navigate('/login'), 2000)
            })
            .catch((error) => {
                console.error(error)
                toast.error(error.message || 'Error resetting password')
            })
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
        >
            <div className="p-8">
                <Title className="">Reset Password</Title>

                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                {message && <p className="text-green-500 text-sm mb-4">{message}</p>}

                <form onSubmit={handleResetPassword}>
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="false"
                        placeholder="New Password"
                        icon={Lock}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        autoComplete="false"
                        placeholder="Confirm New Password"
                        icon={Lock}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? <Loader className=" animate-spin mx-auto" size={24} /> : 'Set New Password'}
                    </motion.button>
                </form>
            </div>
        </motion.div>
    )
}
