import { useAppSelector } from '@/store/hooks'
import { NavLink, Outlet } from 'react-router-dom'

function AuthenticatedNavBar() {
    return (
        <>
            <NavLink to="/dashboard">Dashboard</NavLink>
        </>
    )
}
function NotAuthenticatedNavBar() {
    return (
        <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/signup">SignUp</NavLink>
        </>
    )
}

export function Layout() {
    const user = useAppSelector((state) => state.user.userInfo)
    const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated)

    return (
        <header>
            <NavLink to="/">About project</NavLink>
            {isAuthenticated && user?.isVerified ? <AuthenticatedNavBar /> : <NotAuthenticatedNavBar />}

            <Outlet />
        </header>
    )
}
