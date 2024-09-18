//     const ProtectRoute = ({ children }: { children: JSX.Element }) => {
//         const user = useAuthenticationStore((state) => state.user)
//         const isAuthenticated = useAuthenticationStore((state) => state.isAuthenticated)

//         if (!isAuthenticated && !user) return <Navigate to="/login" replace />

//         return children
//     }
// const RedirectRoute = ({ children }: { children: JSX.Element }) => {
//     const user = useAuthenticationStore((state) => state.user)
//     const isAuthenticated = useAuthenticationStore((state) => state.isAuthenticated)

//     if (isAuthenticated) return <Navigate to="/dashboard" replace />
//     if (user) return <Navigate to="/dashboard" replace />

//     return children
// }

// const user = useAuthenticationStore((state) => state.user)
// const checkAuthFunc = useAuthenticationStore((state) => state.checkAuthFunc)
// const isLoading = useAuthenticationStore((state) => state.isLoading)
// // const isAuthenticated = useAuthenticationStore((state) => state.isAuthenticated)

// useEffect(() => {
//     checkAuthFunc()
// }, [checkAuthFunc])

// console.log(isAuthenticated)

// if (isLoading) return <div>Loading...</div>
