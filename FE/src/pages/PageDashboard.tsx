import { useAppSelector } from '@/store/hooks'

export default function DashboardPage() {
    const user = useAppSelector((state) => state.user.userInfo)

    return (
        <div>
            <h2>Dashboard</h2>

            <p>User info</p>
            <pre>{JSON.stringify(user, null, 2)}</pre>
        </div>
    )
}
