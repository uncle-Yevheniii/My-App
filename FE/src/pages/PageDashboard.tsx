import axios from 'axios'
import { useState } from 'react'

import { useAuthenticationStore } from '@/store/authenticationStore'
import { formatDate } from '@/utils/dateFormate'

export default function DashboardPage() {
    const [errorMessage, setErrorMessage] = useState<string>('')

    const user = useAuthenticationStore((state) => state.user)
    const logoutFunc = useAuthenticationStore((state) => state.logoutFunc)

    // const navigate = useNavigate()

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        try {
            await logoutFunc()
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                return setErrorMessage(err.response?.data?.msg)
            }
            return setErrorMessage('Error signing up')
        }
    }
    console.log(user)
    return (
        <div>
            <h2>Dashboard</h2>

            <div>
                <p>User info</p>
                <p>Name: {user?.name}</p>
                <p>Email: {user?.email}</p>
                <p>Last login: {formatDate(user?.lastLogin)}</p>
                <p>createdAt: {formatDate(user?.createdAt)}</p>
                <p>updatedAt: {formatDate(user?.updatedAt)}</p>
            </div>

            {errorMessage && <p>{errorMessage}</p>}

            <button type="button" onClick={handleSubmit}>
                Logout
            </button>
        </div>
    )
}
