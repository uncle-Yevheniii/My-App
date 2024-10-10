import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

import { IFormValues, IFormValue } from '@/models/IFormValues'

axios.defaults.withCredentials = true
const BASE_URI = 'http://localhost:8080/api/users'

export const userSignUp = createAsyncThunk('user/signup', async (data: IFormValues, { rejectWithValue }) => {
    try {
        const res = await axios.post(`${BASE_URI}/signup`, { name: data.name, email: data.email, password: data.password })
        return res.data
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) return rejectWithValue(error.response?.data?.msg || 'An error occurred')
        return rejectWithValue('An unexpected error occurred')
    }
})

export const userLogin = createAsyncThunk('user/login', async (data: IFormValue, { rejectWithValue }) => {
    try {
        const res = await axios.post(`${BASE_URI}/login`, { email: data.email, password: data.password })
        return res.data
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) return rejectWithValue(error.response?.data?.msg || 'An error occurred')
        return rejectWithValue('An unexpected error occurred')
    }
})

export const userEmailVerify = createAsyncThunk('user/emailVerify', async (data: { token: string }, { rejectWithValue }) => {
    try {
        const res = await axios.post(`${BASE_URI}/email-verify`, { verificationToken: data.token })
        return res.data
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) return rejectWithValue(error.response?.data?.msg || 'An error occurred')
        return rejectWithValue('An unexpected error occurred')
    }
})

export const userCheckAuth = createAsyncThunk('user/checkAuth', async (_, { rejectWithValue }) => {
    try {
        const res = await axios.get(`${BASE_URI}/check-auth`)
        return res.data
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) return rejectWithValue(error.response?.data?.msg || 'An error occurred')
        return rejectWithValue('An unexpected error occurred')
    }
})

export const userLogOut = createAsyncThunk('user/logout', async (_, { rejectWithValue }) => {
    try {
        const res = await axios.get(`${BASE_URI}/logout`)
        return res.data
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) return rejectWithValue(error.response?.data?.msg || 'An error occurred')
        return rejectWithValue('An unexpected error occurred')
    }
})

export const userUpdateAvatar = createAsyncThunk('user/updateAvatar', async (file: File, { rejectWithValue }) => {
    try {
        const formData = new FormData()
        formData.append('avatar', file)

        const res = await axios.patch(`${BASE_URI}/update`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return res.data
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) return rejectWithValue(error.response?.data?.msg || 'An error occurred')
        return rejectWithValue('An unexpected error occurred')
    }
})
