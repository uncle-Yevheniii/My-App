import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { Input } from '@/components'
import { useState } from 'react'
import { Lock, Mail, User } from 'lucide-react'
import { useAuthenticationStore } from '@/store/authenticationStore'

export default function SignUpPage() {
    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [errorMessage, setErrorMessage] = useState<string>('')

    const signupFunc = useAuthenticationStore((state) => state.signupFunc)
    const isLoading = useAuthenticationStore((state) => state.isLoading)

    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        await signupFunc(email, password, name)
            .then(() => {
                navigate('/email-verify')
            })
            .catch((err: unknown) => {
                if (axios.isAxiosError(err)) {
                    return setErrorMessage(err.response?.data?.msg)
                }
                return setErrorMessage('Error signing up')
            })
    }

    return (
        <div>
            <h2>Create Account</h2>

            <form autoComplete="off" onSubmit={handleSubmit}>
                <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your Name"
                    autoComplete="off"
                    icon={User}
                    value={name}
                    onChange={(e) => setName(e.target.value.trim())}
                />
                <Input
                    id="email"
                    name="email"
                    type="text"
                    placeholder="Enter your Email"
                    autoComplete="off"
                    icon={Mail}
                    value={email}
                    onChange={(e) => setEmail(e.target.value.trim())}
                />
                <Input
                    id="password"
                    name="password"
                    type="text"
                    placeholder="Enter your Password"
                    autoComplete="off"
                    icon={Lock}
                    value={password}
                    onChange={(e) => setPassword(e.target.value.trim())}
                />

                {errorMessage && <p>{errorMessage}</p>}

                <button type="submit">{isLoading ? 'Loading...' : 'Sign Up'}</button>
            </form>

            <div>
                <p>Already have an account?</p>
                <Link to="/login">Login</Link>
            </div>
        </div>
    )
}
