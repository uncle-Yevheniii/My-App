import toast from 'react-hot-toast'

import { useRef } from 'react'

import { formatDate } from '@/helpers'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { userLogOut, userUpdateAvatar } from '@/store/user/userOperations'
import { UserBasedAvatar } from '@/components'

export default function DashboardPage() {
    const dispatch = useAppDispatch()
    const user = useAppSelector((state) => state.user.userInfo)
    const fileInputRef = useRef<HTMLInputElement | null>(null)

    const handleLogout = () =>
        toast.promise(dispatch(userLogOut()), {
            loading: 'Logging out...',
            success: 'Logged out successfully',
            error: 'Failed to log out'
        })

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            toast.promise(dispatch(userUpdateAvatar(file)).unwrap(), {
                loading: 'Updating avatar...',
                success: 'Avatar updated successfully!',
                error: 'Failed to update avatar'
            })
        }
    }

    const handleAvatarClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click()
        }
    }

    return (
        <section className="form-container">
            <h2 className="title-text">Dashboard</h2>

            <div className="bg-secondary p-8 rounded-2xl mb-5">
                <h3 className="title-text text-xl text-background">Profile Information</h3>

                <div className=" mb-2 rounded-md overflow-hidden flex justify-center align-center">
                    {user?.avatar !== '' ? (
                        <img src={user?.avatar} alt="avatar" onClick={handleAvatarClick} className="cursor-pointer" />
                    ) : (
                        <UserBasedAvatar onClick={handleAvatarClick} />
                    )}

                    <input type="file" ref={fileInputRef} style={{ display: 'none' }} accept="image/*" onChange={handleFileChange} />
                </div>

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
