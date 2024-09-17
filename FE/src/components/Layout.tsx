import { NavLink, Outlet } from 'react-router-dom'
// import { useAuthenticationStore } from '@/store/authenticationStore'

export function Layout() {
    // const isAuthenticated = useAuthenticationStore((state) => state.isAuthenticated)

    return (
        <header>
            <NavLink to="/">About project</NavLink>
            <NavLink to="/signup">SignUp</NavLink>
            <NavLink to="/login">Login</NavLink>

            <Outlet />
        </header>
    )
}
