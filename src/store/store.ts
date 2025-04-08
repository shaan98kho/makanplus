import { combineReducers, configureStore } from "@reduxjs/toolkit"

import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"

import authReducer from "./features/user/authSlice"
import userReducer from "./features/user/userSlice"
import geminiReducer from "./features/gemini/geminiSlice"

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    gemini: geminiReducer
})

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["auth", "user"],
    blacklist: ["gemini"]
}

const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
            ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
            },
        }),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch