export interface IUser {
    _id: string
    email: string
    name: string
    isVerified: boolean
    verificationToken: string
    verificationTokenExpiresAt: Date | number
    lastLogin: string
    createdAt: string
    updatedAt: string
}
export interface IUserState {
    userInfo: IUser | null
    isAuthenticated: boolean
    isLoadingUser: boolean

    isLoadingFetch: boolean
    isErrorMsgFetch: string
}

export const initialState: IUserState = {
    userInfo: null,
    isAuthenticated: false,
    isLoadingUser: false,

    isLoadingFetch: false,
    isErrorMsgFetch: ''
}
