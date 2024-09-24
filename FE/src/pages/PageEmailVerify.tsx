// import axios from 'axios'
import { useState } from 'react'
// import { useNavigate } from 'react-router-dom'

// import { useAuthenticationStore } from '@/store/authenticationStore'

//TODO: need to logic verify email
export default function EmailVerifyPage() {
    const [token, setToken] = useState<string>('')
    // const [errorMessage, setErrorMessage] = useState<string>('')

    // const emailVerifyFunc = useAuthenticationStore((state) => state.emailVerifyFunc)

    // const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // try {
        //     await emailVerifyFunc(token)
        //     navigate('/dashboard')
        // } catch (err: unknown) {
        //     if (axios.isAxiosError(err)) {
        //         return setErrorMessage(err.response?.data?.msg)
        //     }
        //     return setErrorMessage('Error signing up')
        // }
    }
    return (
        <div>
            <h2>Verify Your Email</h2>

            <form onSubmit={handleSubmit}>
                <input
                    className="border"
                    id="verify-token"
                    name="verify-token"
                    type="text"
                    placeholder="Enter your Verify token"
                    value={token}
                    onChange={(e) => setToken(e.target.value.trim())}
                />

                {/* {errorMessage && <p>{errorMessage}</p>} */}

                <button type="submit">Login</button>
            </form>
        </div>
    )
}
