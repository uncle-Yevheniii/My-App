import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

export default function Layout() {
    return (
        <>
            <p>Layout</p>
            <Suspense fallback={null}>
                <Outlet />
            </Suspense>
        </>
    )
}
