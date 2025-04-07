import { onAuthStateChanged } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { fetchUserProfile } from "@/store/features/user/userThunks"

interface UserProfile {
    email: string,
    role: string,
    address: string,
    
    // fields specific to business partners
    business_name?: string,
    business_id?: string,
    business_type?: string,
    inventory_count?: number,

    // fields specific to customers
    coins?: number,
    completed_module?: number,
    name?: string
}

export function useAuthListener() {
    const dispatch = useDispatch()

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            if(user) {
                const serUser = {
                    uid: user.uid,
                    email: user.email,
                    name: user

                }
            }
        })
    })
}