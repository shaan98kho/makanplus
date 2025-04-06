import { createSlice } from "@reduxjs/toolkit"
import { registerUser, signIn } from "./authThunks"

interface AuthState {
    user: any | null,
    loading: boolean,
    error: string | null,
    success: boolean
}

const initialState: AuthState = {
    user: null,
    loading: false,
    error: null,
    success: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signOut: (state) => {
            state.user = null
        },
    },
    extraReducers: (builder) => {
        builder
            // register
            .addCase(registerUser.pending, (state) => {
                state.loading = true,
                state.error = null,
                state.success = false
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false,
                state.user = action.payload,
                state.success = true
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false,
                state.error = action.payload as string
                state.success = false
            })
            // sign in
            .addCase(signIn.pending, (state) => {
                state.loading = true,
                state.error = null,
                state.success = false
            })
            .addCase(signIn.fulfilled, (state, action) => {
                state.loading = false,
                state.user = action.payload,
                state.success = true
            })
            .addCase(signIn.rejected, (state, action) => {
                state.loading = false,
                state.error = action.payload as string
                state.success = false
            })
        }
})

export default authSlice.reducer