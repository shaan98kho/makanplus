import { db } from "@/lib/firebase"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { User } from "firebase/auth"
import { 
    getDoc,
    doc,
} from "firebase/firestore/lite"

import { UserProfile } from "./userTypes"

interface UserPayload {
    user: UserProfile | null,
    loading: boolean,
    error: string | null
}

interface UserRoleProfilePayload {
    uid: string,
    collectionName: string
}

export const fetchUserProfile = createAsyncThunk<UserProfile, string, {rejectValue: string}>(
    'user/fetchUserProfile',
    async (uid, {rejectWithValue}) => {
        try {
            const docRef = doc(db, "users", uid)
            const snapshot = await getDoc(docRef)
        
            const profile = snapshot.exists() ? snapshot.data() : null
            return profile as UserProfile
        } catch (e: any) {
            console.log("There's an error while fetching profile:", e.message)
            return rejectWithValue(e.message)
        }
    }
)

export const fetchUserProfileByRole = createAsyncThunk(
    'user/fetchUserProfileByRole',
    async ({uid, collectionName}: UserRoleProfilePayload, {rejectWithValue}) => {
        try {
            const docRef = doc(db, collectionName, uid)
            const snapshot = await getDoc(docRef)
            // console.log(snapshot)

            const profile = snapshot.exists() ? snapshot.data() : null
            return profile as UserProfile
        } catch (e: any) {
            console.log("There's an error while fetching profile:", e.message)
            return rejectWithValue(e.message)
        }
    }
)