import { ErrorMessage, Field } from 'formik'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
}

export default function Input({ icon: Icon, ...props }: InputProps) {
    return (
        <div className="relative mb-7">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Icon className="size-6 text-text transition duration-200" />
            </div>

            <Field
                {...props}
                className="w-full pl-12 pr-4 py-2 text-text bg-background rounded-xl border transition duration-200
                
                border-b-primary border-x-background border-t-background 
                focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary 
                placeholder-text placeholder-opacity-60 placeholder:italic "
            />

            <ErrorMessage
                name={props.name as string}
                render={(msg) => <div className="absolute bottom-[-1.5rem] left-4 text-sm text-primary italic tracking-[-0.06rem]">{msg}</div>}
            />
        </div>
    )
}
