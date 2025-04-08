import { auth, db } from "@/lib/firebase"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { User } from "firebase/auth"
import {
    getDoc,
    setDoc,
    doc,
} from "firebase/firestore/lite"

import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut 
} from "firebase/auth"

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

interface RegisterPayload {
    email: string,
    password: string,
    additionalData?: {
        role: 'customer' | 'business_partner',
        name?: string,
        address: string,
        business_id?: string,
        business_type?: string,
        business_name?: string,
        inventory_count?: number,
        coins?: number,
        completed_module?: number,
    }
}

interface LoginPayload {
    email: string,
    password: string,
}

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async ({email, password, additionalData}: RegisterPayload, {rejectWithValue}) => {
        try {
            const userCreds = await createUserWithEmailAndPassword(auth, email, password)

            const user = userCreds.user
            const userData = {
                uid: user.uid,
                email: user.email,
                role: additionalData?.role,
                address: additionalData?.address
            }
            await setDoc(doc(db, 'users', user.uid), userData)

            if (additionalData?.role === "business_partner") {
                const businessData = {
                    owner_id: user.uid,
                    business_type: additionalData.business_type,
                    business_name: additionalData.business_name,
                    inventory_count: additionalData.inventory_count
                }

                await setDoc(doc(db, 'businessPartners', user.uid), businessData)
            }
            else if (additionalData?.role === "customer") {
                const customerData = {
                    uid: user.uid,
                    name: additionalData.name,
                    coins: additionalData.coins,
                    completed_module: additionalData.completed_module
                }

                await setDoc(doc(db, 'customers', user.uid), customerData)
            }

            return userData;
        }
        catch(e: any) {
            console.error("Error during registration:", e.message);

            return rejectWithValue(e.message)
        }
    }
)

export const signIn = createAsyncThunk(
    'auth/signInWithEmailAndPassword', 
    async ({email, password}: LoginPayload, {rejectWithValue}) => {
        try {
            const userCreds = await signInWithEmailAndPassword(auth, email, password)

            const user = userCreds.user
            const userInfo = {
                uid: user.uid,
                email: user.email,
            }

            return userInfo
        }
        catch(e: any) {
            console.log("Error during login:", e.message)
            return rejectWithValue(e.message)
        }
    }
)

export const userSignOut = createAsyncThunk(
    'auth/signOut',
    async(_, {rejectWithValue}) => {
        try {
            console.log("clicked")
            await signOut(auth)
        } catch(e: any) {
            console.log("Error signing out:", e.message)
            return rejectWithValue(e.message)
        }
    }
)

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