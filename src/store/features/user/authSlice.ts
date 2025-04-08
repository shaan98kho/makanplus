import { createSlice } from "@reduxjs/toolkit"
import { registerUser, signIn, userSignOut } from "./authThunks"

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
        userSignOutsignOut: (state) => {
            state.user = null
        },
        clearUserProfile: (state) => {
            state.user = null,
            state.loading = false,
            state.error = null
        },
        resetStatus(state) {
            state.success = false,
            state.error = null
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
            // sign out
            .addCase(userSignOut.pending, (state) => {
                state.loading = true,
                state.error = null,
                state.success = false
            })
            .addCase(userSignOut.fulfilled, (state, action) => {
                console.log("SIGN OUT fulfilled — clearing user");  

                state.loading = false,
                state.user = null,
                state.success = true
            })
            .addCase(userSignOut.rejected, (state, action) => {
                state.loading = false,
                state.error = action.payload as string
                state.success = false
            })
        }
})

export const { clearUserProfile, resetStatus } = authSlice.actions;
export default authSlice.reducer