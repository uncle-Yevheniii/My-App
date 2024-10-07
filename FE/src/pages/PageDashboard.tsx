import { formatDate } from '@/helpers'
import { userLogOut } from '@/store/user/userOperations'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import toast from 'react-hot-toast'

export default function DashboardPage() {
    const dispatch = useAppDispatch()
    const user = useAppSelector((state) => state.user.userInfo)

    const handleLogout = () =>
        toast.promise(dispatch(userLogOut()), { loading: 'Logging out...', success: 'Logged out successfully', error: 'Failed to log out' })

    return (
        <section className="form-container">
            <h2 className="title-text">Dashboard</h2>

            <div className="bg-secondary p-8 rounded-2xl mb-5">
                <h3 className="title-text text-xl text-background">Profile Information</h3>
                <p className="text-xl text-opacity-70 text-background">
                    {'Name: '}
                    <span>{user?.name && (user.name.length > 20 ? user.name.substring(0, 20) + '...' : user.name)}</span>
                </p>
                <p className="text-xl text-opacity-70 text-background">
                    {'Email: '}
                    <span>{user?.email}</span>
                </p>
            </div>
            <div className="bg-secondary p-8 rounded-2xl mb-2">
                <h3 className="title-text text-xl text-background">Account activity</h3>
                <p className="text-xl text-opacity-70 text-background">
                    {'Joined: '}
                    <span>{formatDate(user?.createdAt as string)}</span>
                </p>
                <p className="text-xl text-opacity-70 text-background">
                    {'Last Login: '}
                    <span>{formatDate(user?.lastLogin as string)}</span>
                </p>
            </div>

            <button onClick={handleLogout} className="btn">
                Logout
            </button>
        </section>
    )
}
