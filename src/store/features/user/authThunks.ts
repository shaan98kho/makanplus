import { auth, db } from "@/lib/firebase"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { setDoc, doc } from "firebase/firestore/lite"
import { createAsyncThunk } from "@reduxjs/toolkit"

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
                    business_name: additionalData.business_name
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

            return user

        }
        catch(e: any) {
            console.log("Error during login:", e.message)
            return rejectWithValue(e.message)
        }
    }
)