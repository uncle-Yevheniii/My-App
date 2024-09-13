import axios from 'axios'
import { create } from 'zustand'
import { Action, State } from '../types/authentication'

axios.defaults.baseURL = 'http://localhost:8080/api/users' //! authentication app !
axios.defaults.withCredentials = true

export const useAuthenticationStore = create<State & Action>((set) => ({
    user: null,
    error: null,
    isLoading: false,
    isAuthenticated: false,
    isCheckingAuthentication: false,

    // signup function
    signup: async (email: string, password: string, name: string) => {
        set({
            isLoading: true,
            error: null
        })

        await axios
            .post('/signup', { email, password, name })
            .then((res) =>
                set({
                    user: res.data.user,
                    isAuthenticated: true,
                    isLoading: false
                })
            )
            .catch((err) => {
                set({
                    error: err.response.data.msg || 'Error signing up',
                    isLoading: false
                })
                throw err
            })
    },

    //verify function
    verifyEmail: async (token: string) => {
        set({
            isLoading: true,
            error: null
        })
        await axios
            .post('/email-verify', { token })
            .then((res) => {
                set({
                    user: res.data.user,
                    isAuthenticated: true,
                    isLoading: false
                })
                return res.data
            })
            .catch((err) => {
                set({
                    error: err.response.data.msg || 'Error verifying email',
                    isLoading: false
                })
                throw err
            })
    }

    // login function
    // login function
    // login function
    // login function
    // login function
}))
