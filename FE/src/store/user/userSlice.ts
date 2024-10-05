import { createSlice } from '@reduxjs/toolkit'
import { userSignUp, userLogin, userEmailVerify, userCheckAuth, userLogOut } from './userOperations'

import { initialState } from '@/models/IUser'

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(userSignUp.pending, (state) => {
            state.isLoadingFetch = true
            state.isErrorMsgFetch = ''
        })
        builder.addCase(userSignUp.fulfilled, (state, action) => {
            state.isLoadingFetch = false
            state.userInfo = action.payload.user
        })
        builder.addCase(userSignUp.rejected, (state, action) => {
            state.isLoadingFetch = false
            state.isErrorMsgFetch = typeof action.payload === 'string' ? action.payload : 'Something went wrong'
        })

        builder.addCase(userLogin.pending, (state) => {
            state.isErrorMsgFetch = ''
            state.isLoadingFetch = true
        })
        builder.addCase(userLogin.fulfilled, (state, action) => {
            state.isLoadingFetch = false
            state.isAuthenticated = true
            state.userInfo = action.payload.user
        })
        builder.addCase(userLogin.rejected, (state, action) => {
            state.isLoadingFetch = false
            state.isErrorMsgFetch = typeof action.payload === 'string' ? action.payload : 'Something went wrong'
        })

        builder.addCase(userEmailVerify.pending, (state) => {
            state.isErrorMsgFetch = ''
            state.isLoadingFetch = true
        })
        builder.addCase(userEmailVerify.fulfilled, (state, action) => {
            state.isLoadingFetch = false
            state.isAuthenticated = true
            state.userInfo = action.payload.user
        })
        builder.addCase(userEmailVerify.rejected, (state, action) => {
            state.isLoadingFetch = false
            state.isErrorMsgFetch = typeof action.payload === 'string' ? action.payload : 'Something went wrong'
        })

        builder.addCase(userCheckAuth.pending, (state) => {
            state.isLoadingUser = true
            state.isErrorMsgFetch = ''
        })
        builder.addCase(userCheckAuth.fulfilled, (state, action) => {
            state.isLoadingUser = false
            state.isAuthenticated = true
            state.userInfo = action.payload.user
        })
        builder.addCase(userCheckAuth.rejected, (state, action) => {
            state.isLoadingUser = false
            state.isAuthenticated = false
            state.isErrorMsgFetch = typeof action.payload === 'string' ? action.payload : 'Something went wrong'
        })

        builder.addCase(userLogOut.pending, (state) => {
            state.isLoadingFetch = true
            state.isErrorMsgFetch = ''
        })
        builder.addCase(userLogOut.fulfilled, (state) => {
            state.isLoadingFetch = false
            state.isAuthenticated = false
        })
        builder.addCase(userLogOut.rejected, (state, action) => {
            state.isLoadingFetch = false
            state.isErrorMsgFetch = typeof action.payload === 'string' ? action.payload : 'Something went wrong'
        })
    }
})

export default userSlice.reducer
