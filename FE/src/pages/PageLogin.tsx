import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Lock, Loader } from 'lucide-react'
import { Link } from 'react-router-dom'

import { FormFooter, Input, Title } from '../components'
import { useAuthStore } from '../store/authStore'

export default function LoginPage() {
    //local state
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    //store
    const login = useAuthStore((state) => state.login)
    const error = useAuthStore((state) => state.error)
    const isLoading = useAuthStore((state) => state.isLoading)

    //handlers
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()

        await login(email, password)
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
                <Title className="">Welcome Back</Title>

                {/* Form */}
                <form onSubmit={handleLogin} autoComplete="off">
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your Email"
                        icon={Mail}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="false"
                        placeholder="Enter your Password"
                        icon={Lock}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {/* Forgot Password */}
                    <div className="flex items-center mb-6">
                        <Link to="/forgot-password" className="text-sm text-green-400 hover:underline">
                            Forgot password?
                        </Link>
                    </div>

                    {/* Error */}
                    {error && <p className="text-red-500 font-semibold mb-2">{error}</p>}

                    <motion.button
                        className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? <Loader className=" animate-spin mx-auto" size={24} /> : 'Login'}
                    </motion.button>
                </form>
            </div>

            {/* Footer */}
            <FormFooter path="/signup" label="Sign up">
                Don't have an account?
            </FormFooter>
        </motion.div>
    )
}
