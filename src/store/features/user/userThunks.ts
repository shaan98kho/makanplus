import { db } from "@/lib/firebase"
import { 
    getDoc,
    doc,
} from "firebase/firestore/lite"

export async function fetchUserProfile(uid: string, collectionName: string) {
    const docRef = doc(db, collectionName, uid)
    const snapshot = await getDoc(docRef)

    const profile = snapshot.exists() ? snapshot.data() : null
    return profile    
}