export interface IResponseUser {
    email: string
    password: string
    name: string
    lastLogin: Date
    isVerified: boolean
    resetPasswordToken: string | undefined
    resetPasswordExpiresAt: number | undefined
    verificationToken: string | undefined
    verificationTokenExpiresAt: number | undefined
}

export interface State {
    user: null | IResponseUser
    error: null | string
    isLoading: boolean
    isAuthenticated: boolean
    isCheckingAuthentication: boolean
}

export interface Action {
    signup: (email: string, password: string, name: string) => Promise<void>
    verifyEmail: (token: string) => Promise<void>
    // updateFirstName: (firstName: State['firstName']) => void
}
