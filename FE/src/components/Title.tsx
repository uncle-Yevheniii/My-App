export default function Title({ children, className }: { children: string; className?: string }) {
    return (
        <h2
            className={
                'text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text ' + className
            }
        >
            {children}
        </h2>
    )
}
