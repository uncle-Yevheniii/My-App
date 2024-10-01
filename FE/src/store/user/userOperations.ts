import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

import { IFormValues, IFormValue } from '@/models/IFormValues'

const BASE_URI = 'http://localhost:8080/api/users'

export const userSignUp = createAsyncThunk('user/signup', async (data: IFormValues, thankApi) => {
    try {
        const res = await axios.post(`${BASE_URI}/signup`, { name: data.name, email: data.email, password: data.password })
        return res.data
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) return thankApi.rejectWithValue(error.response?.data?.msg)
        return error
    }
})

export const userLogin = createAsyncThunk('user/login', async (data: IFormValue, thankApi) => {
    try {
        const res = await axios.post(`${BASE_URI}/login`, { email: data.email, password: data.password })
        return res.data
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) return thankApi.rejectWithValue(error.response?.data?.msg)
        return error
    }
})

export const userEmailVerify = createAsyncThunk('user/emailVerify', async (data: { token: string }, thankApi) => {
    try {
        const res = await axios.post(`${BASE_URI}/email-verify`, { verificationToken: data.token })
        return res.data
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) return thankApi.rejectWithValue(error.response?.data?.msg)
        return error
    }
})
