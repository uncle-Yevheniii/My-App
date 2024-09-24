// import { Navigate } from 'react-router-dom'

// import { useAuthenticationStore } from '@/store/authenticationStore'

// export default function RedirectRoute({ children }: { children: JSX.Element }) {
//     const user = useAuthenticationStore((state) => state.user)
//     const isAuthenticated = useAuthenticationStore((state) => state.isAuthenticated)

//     console.log(user)
//     console.log(isAuthenticated)

//     if (isAuthenticated) return <Navigate to="/dashboard" replace />
//     if (user) return <Navigate to="/dashboard" replace />

//     return children
// }
