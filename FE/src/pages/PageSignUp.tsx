import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { Loader, Lock, Mail, User } from 'lucide-react'

import { Input, PasswordStrengthMeter } from '../components'
import { useAuthStore } from '../store/authStore'

export default function SignUpPage() {
    //local state
    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    //store
    const signup = useAuthStore((state) => state.signup)
    const error = useAuthStore((state) => state.error)
    const isLoading = useAuthStore((state) => state.isLoading)

    //hook
    const navigate = useNavigate()

    //handlers
    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault()

        await signup(email, password, name)
            .then(() => navigate('/dashboard'))
            .catch((error) => console.log(error))
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
                <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
                    Create Account
                </h2>

                {/* Form */}
                <form onSubmit={handleSignUp} autoComplete="off">
                    <Input
                        id="username"
                        name="username"
                        type="text"
                        placeholder="Enter your Username"
                        icon={User}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
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
                        placeholder="Enter your Password"
                        icon={Lock}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {/* error */}
                    {error && <p className="text-red-500 font-semibold mt-2">{error}</p>}

                    {/* PasswordStrengthMeter */}
                    <PasswordStrengthMeter password={password} />

                    <motion.button
                        className="mt-5 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? <Loader className=" animate-spin mx-auto" size={24} /> : 'Sign Up'}
                    </motion.button>
                </form>
            </div>

            {/* Footer */}
            <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center">
                <p className="text-sm text-gray-400">
                    Already have an account?{' '}
                    <Link to={'/login'} className="text-green-400 hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </motion.div>
    )
}
