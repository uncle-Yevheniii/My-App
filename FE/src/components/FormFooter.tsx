import { Link } from 'react-router-dom'

export default function FormFooter({ path, label, children }: { path: string; label: string; children: React.ReactNode }) {
    return (
        <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center">
            <p className="text-sm text-gray-400">
                {`${label} `}
                <Link to={path} className="text-green-400 hover:underline">
                    {children}
                </Link>
            </p>
        </div>
    )
}
