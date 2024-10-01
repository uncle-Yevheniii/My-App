import { useAppSelector } from '@/store/hooks'

export default function DashboardPage() {
    const user = useAppSelector((state) => state.user.user)

    console.log('user', user)
    return (
        <div>
            <h2>Dashboard</h2>

            <p>User info</p>
        </div>
    )
}
