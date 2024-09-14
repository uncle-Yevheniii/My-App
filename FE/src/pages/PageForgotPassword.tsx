import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowLeft, Loader, Mail } from 'lucide-react'

import { Input, Title } from '../components'
import { useAuthStore } from '../store/authStore'
export default function ForgotPasswordPage() {
    //local state
    const [email, setEmail] = useState<string>('')
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false)

    //store
    const forgotPassword = useAuthStore((state) => state.forgotPassword)
    const isLoading = useAuthStore((state) => state.isLoading)

    //handlers
    const handleForgotPassword = async (e: React.FormEvent) => {
        e.preventDefault()
        await forgotPassword(email)
        setIsSubmitted(true)
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
        >
            <div className="p-8">
                {/* Title */}
                <Title className="">Forgot Password</Title>

                {!isSubmitted ? (
                    <form onSubmit={handleForgotPassword} autoComplete="off">
                        <p className="text-gray-300 mb-6 text-center">Enter your email address and we'll send you a link to reset your password.</p>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="false"
                            placeholder="Enter Email address"
                            icon={Mail}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
                            type="submit"
                        >
                            {isLoading ? <Loader className=" animate-spin mx-auto" size={24} /> : 'Send Reset Link'}
                        </motion.button>
                    </form>
                ) : (
                    <div className="text-center">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                            className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
                        >
                            <Mail className="h-8 w-8 text-white" />
                        </motion.div>
                        <p className="text-gray-300 mb-6">If an account exists for {email}, you will receive a password reset link shortly.</p>
                    </div>
                )}
            </div>

            {/* Back to Login */}
            <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center">
                <Link to={'/login'} className="text-sm text-green-400 hover:underline flex items-center">
                    <ArrowLeft className="h-4 w-4 mr-2" /> Back to Login
                </Link>
            </div>
        </motion.div>
    )
}
