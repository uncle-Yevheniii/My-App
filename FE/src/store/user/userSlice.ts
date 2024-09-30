import { createSlice } from '@reduxjs/toolkit'
import { userSignUp } from './userOperations'

interface IUser {
    success: boolean
    msg: string
    user: {
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
}

interface IUserState {
    user: IUser | null
    isLoading: boolean
    isError: string
}

const initialState: IUserState = {
    user: null,
    isLoading: false,
    isError: ''
}

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
            console.log(action.payload)
        })
        builder.addCase(userSignUp.rejected, (state, action) => {
            state.isLoading = false
            state.isError = action.payload as string
        })
    }
})

export default userSlice.reducer
