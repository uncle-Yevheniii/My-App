interface IUser {
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
export interface Store {
    user: IUser | null
    isAuthenticated: boolean
    error: null | string
    isLoading: boolean
    isCheckingAuth: boolean
    message: null | string
}
export interface Action {
    signup: (email: string, password: string, name: string) => Promise<void>
    login: (email: string, password: string) => Promise<void>
    logout: () => Promise<void>
    checkAuth: () => Promise<void>
    verifyEmail: (token: string) => Promise<void>
    forgotPassword: (email: string) => Promise<void>
    resetPassword: (token: string, password: string) => Promise<void>
}
