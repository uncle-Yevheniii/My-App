import axios from 'axios'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

const API_URL = import.meta.env.MODE === 'development' ? 'http://localhost:8080/api/users' : '/api/users'
axios.defaults.withCredentials = true

interface IUser {
    _id: string
    email: string
    password: string
    name: string
    lastLogin: string
    createdAt: string
    updatedAt: string
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
    isLoadingFunc: boolean
    isLoadingCheck: boolean
    message: string | null
}
export interface Action {
    signupFunc: (email: string, password: string, name: string) => Promise<void>
    emailVerifyFunc: (token: string) => Promise<void>
    checkAuthFunc: () => Promise<void>
    loginFunc: (email: string, password: string) => Promise<void>
    logoutFunc: () => Promise<void>

    // forgotPassword: (email: string) => Promise<void>
    // resetPassword: (token: string, password: string) => Promise<void>
}

export const useAuthenticationStore = create<Store & Action>()(
    devtools(
        (set) => ({
            user: null,
            isAuthenticated: false,
            isError: '',
            isLoadingFunc: false,
            isLoadingCheck: false,
            message: null,

            signupFunc: async (email, password, name) => {
                set({ isLoadingFunc: true, isError: '' })
                try {
                    const response = await axios.post(`${API_URL}/signup`, { email, password, name })
                    set({ user: response.data.user, isAuthenticated: true, isLoadingFunc: false })
                } catch (error: unknown) {
                    if (axios.isAxiosError(error)) {
                        set({ isError: error.response?.data?.msg, isLoadingFunc: false })
                        throw error
                    }
                    set({ isError: 'Error logging', isLoadingFunc: false })
                    throw error
                }
            },
            emailVerifyFunc: async (token) => {
                set({ isLoadingFunc: true, isError: '' })
                try {
                    const response = await axios.post(`${API_URL}/email-verify`, { verificationToken: token })
                    set({ user: response.data.user, isAuthenticated: true, isLoadingFunc: false })
                } catch (error: unknown) {
                    if (axios.isAxiosError(error)) {
                        set({ isError: error.response?.data?.msg, isLoadingFunc: false })
                        throw error
                    }
                    set({ isError: 'Error verifying email', isLoadingFunc: false })
                    throw error
                }
            },
            checkAuthFunc: async () => {
                set({ isLoadingCheck: true, isError: '' })
                try {
                    const response = await axios.get(`${API_URL}/check-auth`)
                    if (response?.data?.msg === 'Init clear cookie') return set({ user: null, isAuthenticated: false, isLoadingCheck: false })
                    return set({ user: response.data.user, isAuthenticated: true, isLoadingCheck: false })
                } catch (error: unknown) {
                    if (axios.isAxiosError(error)) {
                        set({ isError: error.response?.data?.msg, isAuthenticated: false, isLoadingCheck: false })
                        throw error
                    }
                    set({ isError: 'Checking authentication failed', isAuthenticated: false, isLoadingCheck: false })
                    throw error
                }
            },
            loginFunc: async (email, password) => {
                set({ isLoadingFunc: true, isError: '' })
                try {
                    const response = await axios.post(`${API_URL}/login`, { email, password })
                    set({ user: response.data.user, isAuthenticated: true, isLoadingFunc: false })
                } catch (error: unknown) {
                    if (axios.isAxiosError(error)) {
                        set({ isError: error.response?.data?.msg, isLoadingFunc: false })
                        throw error
                    }
                    set({ isError: 'Error signing up', isLoadingFunc: false })
                    throw error
                }
            },
            logoutFunc: async () => {
                set({ isLoadingFunc: true, isError: '' })
                try {
                    await axios.get(`${API_URL}/logout`)
                    set({ user: null, isAuthenticated: false, isLoadingFunc: false })
                } catch (error: unknown) {
                    if (axios.isAxiosError(error)) {
                        set({ isError: error.response?.data?.msg, isLoadingFunc: false })
                        throw error
                    }
                    set({ isError: 'Error logging out', isLoadingFunc: false })
                    throw error
                }
            }
        }),
        { name: 'AuthenticationStore' }
    )
)
