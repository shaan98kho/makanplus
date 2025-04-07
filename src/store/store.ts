import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./features/user/authSlice"
import geminiReducer from "./features/gemini/geminiSlice"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        gemini: geminiReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch