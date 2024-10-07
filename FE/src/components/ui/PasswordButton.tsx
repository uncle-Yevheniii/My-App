import { Eye, EyeOff } from 'lucide-react'

interface PwdBtnProps {
    setCheck: React.Dispatch<React.SetStateAction<boolean>>
    check: boolean
}

export function PwdBtn({ setCheck, check }: PwdBtnProps) {
    const handleClick = () => setCheck(!check)

    return (
        <button
            onClick={handleClick}
            type="button"
            className="w-[42px] h-[42px] absolute flex items-center justify-center right-[0.1rem] top-[-0.04rem] transition duration-200
            hover:from-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
     focus:ring-offset-primary disabled:opacity-50 disabled:cursor-not-allowed rounded-2xl
            "
        >
            {!check ? <Eye size={30} /> : <EyeOff size={30} />}
        </button>
    )
}
