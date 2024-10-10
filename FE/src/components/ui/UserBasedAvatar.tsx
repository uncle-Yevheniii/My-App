import { User } from 'lucide-react'

export default function UserBasedAvatar({ onClick }: { onClick: React.MouseEventHandler<HTMLDivElement> }) {
    return (
        <div className="flex justify-center align-center bg-background rounded-full p-10 w-50 h-50 hover:cursor-pointer" onClick={onClick}>
            <User size={150} />
        </div>
    )
}
