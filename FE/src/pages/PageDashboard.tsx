import axios from 'axios'
import { useState } from 'react'

import { formatDate } from '@/utils/dateFormate'
import { useAuthenticationStore } from '@/store/authenticationStore'

export default function DashboardPage() {
    const [errorMessage, setErrorMessage] = useState<string>('')

    const user = useAuthenticationStore((state) => state.user)
    const logoutFunc = useAuthenticationStore((state) => state.logoutFunc)

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        try {
            await logoutFunc()
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                return setErrorMessage(err.response?.data?.msg)
            }
            return setErrorMessage('Error logging out')
        }
    }
    return (
        <div>
            <h2>Dashboard</h2>

            <div>
                <p>User info</p>
                <p>Name: {user?.name}</p>
                <p>Email: {user?.email}</p>
                <p>Last login: {formatDate(user?.lastLogin ?? 'isNaN')}</p>
                <p>createdAt: {formatDate(user?.createdAt ?? 'isNaN')}</p>
                <p>updatedAt: {formatDate(user?.updatedAt ?? 'isNaN')}</p>
            </div>

            {errorMessage && <p>{errorMessage}</p>}

            <button type="button" onClick={handleSubmit}>
                Logout
            </button>
        </div>
    )
}
