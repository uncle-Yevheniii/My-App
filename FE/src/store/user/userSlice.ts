import { createSlice } from '@reduxjs/toolkit'
import { userSignUp, userLogin, userEmailVerify } from './userOperations'

import { initialState } from '@/models/IUser'

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(userSignUp.pending, (state) => {
            state.isError = ''
            state.isLoading = true
        })
        builder.addCase(userSignUp.fulfilled, (state, action) => {
            state.isLoading = false
            console.log(action.payload) //TODO add state
        })
        builder.addCase(userSignUp.rejected, (state, action) => {
            state.isLoading = false
            state.isError = typeof action.payload === 'string' ? action.payload : ''
        })

        builder.addCase(userLogin.pending, (state) => {
            state.isError = ''
            state.isLoading = true
        })
        builder.addCase(userLogin.fulfilled, (state, action) => {
            state.isLoading = false
            console.log(action.payload) //TODO add state
        })
        builder.addCase(userLogin.rejected, (state, action) => {
            state.isLoading = false
            state.isError = typeof action.payload === 'string' ? action.payload : ''
        })

        builder.addCase(userEmailVerify.pending, (state) => {
            state.isError = ''
            state.isLoading = true
        })
        builder.addCase(userEmailVerify.fulfilled, (state, action) => {
            state.isLoading = false
            console.log(action.payload) //TODO add state
        })
        builder.addCase(userEmailVerify.rejected, (state, action) => {
            state.isLoading = false
            state.isError = typeof action.payload === 'string' ? action.payload : ''
        })
    }
})

export default userSlice.reducer
