import { useAuthenticationStore } from '@/store/authenticationStore'

export default function DashboardPage() {
    const user = useAuthenticationStore((state) => state.user)

    console.log(user)
    return (
        <div>
            <h2>Dashboard</h2>
        </div>
    )
}
