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

    // functions
    signup: async (email, password, name) => {
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
    }
}))
