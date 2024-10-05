import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { userLogOut } from '@/store/user/userOperations'

export default function DashboardPage() {
    const dispatch = useAppDispatch()
    const user = useAppSelector((state) => state.user.userInfo)

    const handleLogout = () => dispatch(userLogOut())

    return (
        <div>
            <h2>Dashboard</h2>

            <p>User info</p>
            <pre>{JSON.stringify(user, null, 2)}</pre>

            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}
