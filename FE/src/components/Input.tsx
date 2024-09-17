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

// import { forwardRef, HTMLProps, Ref } from 'react'

// interface InputProps extends HTMLProps<HTMLInputElement> {
//     icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
// }

// const Input = forwardRef((props: InputProps, ref: Ref<HTMLInputElement>) => {
//     const { icon: Icon, ...inputProps } = props
//     return (
//         <div className="relative">
//             <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//                 <Icon />
//             </div>

//             <input {...inputProps} ref={ref} />
//         </div>
//     )
// })

// export default Input
