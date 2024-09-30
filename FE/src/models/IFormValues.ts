export const initialValueSignUp: IFormValues = {
    name: '',
    email: '',
    password: ''
}
export const initialValueLogin: IFormValue = {
    email: '',
    password: ''
}

export interface IFormValue {
    email: string
    password: string
}
export interface IFormValues extends IFormValue {
    name: string
}
