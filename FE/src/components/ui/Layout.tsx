import clsx from 'clsx'
import { NavLink, Outlet } from 'react-router-dom'

import { useAppSelector } from '@/store/hooks'

const buildLinkClass = ({ isActive }: { isActive: boolean }) =>
    clsx('bg-secondary p-1 px-8 bg-opacity-50 font-bold text-md rounded-2xl transition duration-200', isActive && 'text-primary text-opacity-50')

function AuthenticatedNavBar() {
    return (
        <div>
            <NavLink to="/dashboard" className={buildLinkClass}>
                Dashboard
            </NavLink>
        </div>
    )
}
function NotAuthenticatedNavBar() {
    return (
        <div className="flex gap-3">
            <NavLink to="/login" className={buildLinkClass}>
                Login
            </NavLink>
            <NavLink to="/signup" className={buildLinkClass}>
                SignUp
            </NavLink>
        </div>
    )
}

export function Layout() {
    const user = useAppSelector((state) => state.user.userInfo)
    const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated)

    return (
        <>
            <header className="flex justify-around align-center max-w-xl w-full text-xl mb-10">
                <NavLink to="/" className={buildLinkClass}>
                    About project
                </NavLink>
                {isAuthenticated && user?.isVerified ? <AuthenticatedNavBar /> : <NotAuthenticatedNavBar />}
            </header>

            <Outlet />
        </>
    )
}
