import { createSlice } from "@reduxjs/toolkit"
import { registerUser } from "./authThunks"

interface AuthState {
    user: any | null,
    loading: boolean,
    error: string | null
}

const initialState: AuthState = {
    user: null,
    loading: false,
    error: null
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
            .addCase(registerUser.pending, (state) => {
                state.loading = true,
                state.error = null
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false,
                state.user = action.payload
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false,
                state.error = action.payload as string
            })}
})

export default authSlice.reducer