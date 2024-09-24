interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
}

export default function Input({ icon: Icon, ...props }: InputProps) {
    return (
        <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Icon />
            </div>

            <input {...props} />
        </div>
    )
}
