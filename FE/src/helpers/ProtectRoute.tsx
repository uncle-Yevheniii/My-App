// import { useAppSelector } from '@/store/hooks'
// import { Navigate } from 'react-router-dom'

// export default function ProtectRoute({ children }: { children: JSX.Element }) {
//     const user = useAppSelector((state) => state.user.user)
//     const isLoadingUser = useAppSelector((state) => state.user.isLoadingUser)

//     if (!isLoadingUser && !user) return <Navigate to="/login" replace />
//     return <>{children}</>
// }
