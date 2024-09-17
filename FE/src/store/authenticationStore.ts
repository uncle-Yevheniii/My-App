import axios from 'axios'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

const API_URL = import.meta.env.MODE === 'development' ? 'http://localhost:8080/api/users' : '/api/users'
axios.defaults.withCredentials = true

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
    isError: string
    isLoading: boolean
    message: string | null
}
export interface Action {
    signupFunc: (email: string, password: string, name: string) => Promise<void>
    emailVerifyFunc: (token: string) => Promise<void>
    checkAuthFunc: () => Promise<void>
    loginFunc: (email: string, password: string) => Promise<void>

    // logout: () => Promise<void>
    // forgotPassword: (email: string) => Promise<void>
    // resetPassword: (token: string, password: string) => Promise<void>
}

export const useAuthenticationStore = create<Store & Action>()(
    devtools(
        (set) => ({
            user: null,
            isAuthenticated: false,
            isError: '',
            isLoading: false,
            message: null,

            signupFunc: async (email, password, name) => {
                set({ isLoading: true, isError: '' })
                try {
                    const response = await axios.post(`${API_URL}/signup`, { email, password, name })
                    set({ user: response.data.user, isAuthenticated: true, isLoading: false })
                } catch (error: unknown) {
                    if (axios.isAxiosError(error)) {
                        set({ isError: error.response?.data?.msg, isLoading: false })
                        throw error
                    }
                    set({ isError: 'Error logging', isLoading: false })
                    throw error
                }
            },
            emailVerifyFunc: async (token) => {
                set({ isLoading: true, isError: '' })
                try {
                    const response = await axios.post(`${API_URL}/email-verify`, { verificationToken: token })
                    set({ user: response.data.user, isAuthenticated: true, isLoading: false })
                } catch (error: unknown) {
                    if (axios.isAxiosError(error)) {
                        set({ isError: error.response?.data?.msg, isLoading: false })
                        throw error
                    }
                    set({ isError: 'Error verifying email', isLoading: false })
                    throw error
                }
            },
            checkAuthFunc: async () => {
                set({ isLoading: true, isError: '' })
                try {
                    const response = await axios.get(`${API_URL}/check-auth`)
                    // if (response.data.msg === 'Init clear cookie') set({ user: null, isAuthenticated: false, isLoading: false })
                    set({ user: response.data.user, isAuthenticated: true, isLoading: false })
                } catch (error: unknown) {
                    if (axios.isAxiosError(error)) {
                        set({ isError: error.response?.data?.msg, isAuthenticated: false, isLoading: false })
                        throw error
                    }
                    set({ isError: 'Checking authentication failed', isAuthenticated: false, isLoading: false })
                    throw error
                }
            },
            loginFunc: async (email, password) => {
                set({ isLoading: true, isError: '' })
                try {
                    const response = await axios.post(`${API_URL}/login`, { email, password })
                    set({ user: response.data.user, isAuthenticated: true, isLoading: false })
                } catch (error: unknown) {
                    if (axios.isAxiosError(error)) {
                        set({ isError: error.response?.data?.msg, isLoading: false })
                        throw error
                    }
                    set({ isError: 'Error signing up', isLoading: false })
                    throw error
                }
            }
        }),
        { name: 'AuthenticationStore' }
    )
)
