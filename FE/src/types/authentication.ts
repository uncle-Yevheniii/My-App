export const LoginFormState = {
    email: '',
    password: ''
}

export const SignUpFormState = {
    username: '',
    email: '',
    password: ''
}

export interface ILoginFormValues {
    email: string
    password: string
}

export interface ISignUpFormValues extends ILoginFormValues {
    username: string
}
