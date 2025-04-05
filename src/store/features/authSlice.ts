import { createSlice } from "@reduxjs/toolkit"
import { signInWithEmailAndPassword } from "firebase/auth"

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
    }
})

export default authSlice.reducer