import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuthenticationStore } from '@/store/authenticationStore'

export default function SignUpPage() {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [errorMessage, setErrorMessage] = useState<string>('')

    const loginFunc = useAuthenticationStore((state) => state.loginFunc)

    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const res = await loginFunc(email, password)
            console.log(res) //! console
            navigate('/dashboard')
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                return setErrorMessage(err.response?.data?.msg)
            }
            return setErrorMessage('Error signing up')
        }
    }
    return (
        <div>
            <h2>Welcome back</h2>

            <form onSubmit={handleSubmit}>
                <input
                    className="border"
                    id="email"
                    name="email"
                    type="text"
                    placeholder="Enter your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value.trim())}
                />
                <input
                    className="border"
                    id="password"
                    name="password"
                    type="text"
                    placeholder="Enter your Email"
                    value={password}
                    onChange={(e) => setPassword(e.target.value.trim())}
                />

                {errorMessage && <p>{errorMessage}</p>}

                <button type="submit">Login</button>
            </form>
        </div>
    )
}
