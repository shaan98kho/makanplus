import { createSlice } from "@reduxjs/toolkit"
import { fetchUserProfile } from "./userThunks"

interface CustomerProfile {
    uid: string,
    email: string,
    name: string,
    address: string,
    coins: number,
    progress: number,
    role: 'customer'
}

interface BusinessPartnerProfile {
    uid: string,
    email: string,
    address: string,
    business_type: 'restaurant' | 'supplier',
    business_name: string,
    business_id: string,
    inventory_count: number,
    role: 'business_partner',
    
}

interface UserProfile {
    user: CustomerProfile | BusinessPartnerProfile
}

interface UserState {
    user: UserProfile | null,
    loading: boolean,
    error: string | null
}

const initialState: UserState = {
    user: null,
    loading: false,
    error: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        fetchUserProfile: (state, action) => {
            return action.payload
        }
    },
})