import axios from 'axios'
import { create } from 'zustand'
import { Action, Store } from './type'

axios.defaults.baseURL = import.meta.env.MODE === 'development' ? 'http://localhost:8080/api/users' : '/api/users'
axios.defaults.withCredentials = true

export const useAuthStore = create<Store & Action>((set) => ({
    user: null,
    isAuthenticated: false,
    error: null,
    isLoading: false,
    isCheckingAuth: true,
    message: null,

    /** actions **/

    // SignUp
    signup: async (email: string, password: string, name: string) => {
        set({ isLoading: true, error: null })
        await axios
            .post('/signup', { email, password, name })
            .then((res) => {
                set({ user: res.data.user, isAuthenticated: true, isLoading: false })
            })
            .catch((error) => {
                set({ error: error.response.data.message || 'Error signing up', isLoading: false })
                throw error
            })
    },

    // Login
    login: async (email: string, password: string) => {
        set({ isLoading: true, error: null })
        await axios
            .post('/login', { email, password })
            .then((res) => {
                set({ isAuthenticated: true, user: res.data.user, error: null, isLoading: false })
            })
            .catch((error) => {
                set({ error: error.response?.data?.message || 'Error logging in', isLoading: false })
                throw error
            })
    },

    // Logout
    logout: async () => {
        set({ isLoading: true, error: null })
        await axios
            .get('/logout')
            .then(() => {
                set({ user: null, isAuthenticated: false, error: null, isLoading: false })
            })
            .catch((error) => {
                set({ error: 'Error logging out', isLoading: false })
                throw error
            })
    },

    // Verify Email
    verifyEmail: async (token: string) => {
        set({ isLoading: true, error: null })
        await axios
            .post('/email-verify', { token })
            .then((res) => {
                set({ user: res.data.user, isAuthenticated: true, isLoading: false })
                return res.data //? return user?????
            })
            .catch((error) => {
                set({ error: error.response.data.message || 'Error verifying email', isLoading: false })
                throw error
            })
    },

    // Check Auth
    checkAuth: async () => {
        set({ isCheckingAuth: true, error: null })
        await axios
            .get('/check-auth')
            .then((res) => {
                set({ user: res.data.user, isAuthenticated: true, isCheckingAuth: false })
            })
            .catch((error) => {
                set({ error: null, isCheckingAuth: false, isAuthenticated: false })
                throw error
            })
    },

    // Forgot Password
    forgotPassword: async (email: string) => {
        set({ isLoading: true, error: null })
        await axios
            .post('/forgot-password', { email })
            .then((res) => {
                set({ message: res.data.message, isLoading: false })
            })
            .catch((error) => {
                set({ isLoading: false, error: error.response.data.message || 'Error sending reset password email' })
                throw error
            })
    },

    // Reset Password
    resetPassword: async (token: string, password: string) => {
        set({ isLoading: true, error: null })
        await axios
            .post(`/reset-password/${token}`, { password })
            .then((res) => {
                set({ message: res.data.message, isLoading: false })
            })
            .catch((error) => {
                set({ isLoading: false, error: error.response.data.message || 'Error resetting password' })
                throw error
            })
    }
}))
