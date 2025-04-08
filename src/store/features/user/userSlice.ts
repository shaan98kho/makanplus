import { createSlice } from "@reduxjs/toolkit"
import { fetchUserProfile, fetchUserProfileByRole } from "./userThunks"
import { UserProfile } from "./userTypes"

interface UserState {
    curUser: UserProfile | null,
    loading: boolean,
    error: string | null
}

const initialState: UserState | null = {
    curUser: null,
    loading: false,
    error: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        fetchUserProfile: (state, action) => {
            return action.payload
        },
        fetchUserProfileByRole: (state, action) =>{
            return action.payload
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchUserProfile.pending, (state) => {
            state.loading = true,
            state.error = null
        })
        .addCase(fetchUserProfile.fulfilled, (state, action) => {
            state.loading = false,
            state.curUser = action.payload
        })
        .addCase(fetchUserProfile.rejected, (state, action) => {
            state.loading = false,
            state.error = action.payload as string,
            state.curUser = null
        })
        .addCase(fetchUserProfileByRole.pending, (state) => {
            state.loading = true,
            state.error = null
        })
        .addCase(fetchUserProfileByRole.fulfilled, (state, action) => {
            state.loading = false,
            state.curUser = action.payload
        })
        .addCase(fetchUserProfileByRole.rejected, (state, action) => {
            state.loading = false,
            state.error = action.payload as string,
            state.curUser = null
        })
    },
})

export default userSlice.reducer