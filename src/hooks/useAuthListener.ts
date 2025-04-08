import { onAuthStateChanged } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchUserProfile, 
    fetchUserProfileByRole
} from "@/store/features/user/userThunks"
import { clearUserProfile } from "@/store/features/user/authSlice"
import { AppDispatch } from "@/store/store"
import { RootState } from "@/store/store"

export function useAuthListener() {
    const dispatch = useDispatch<AppDispatch>()
    const authUser = useSelector((state: RootState) => state.auth.user)
    const profile = useSelector((s: RootState) => s.user.curUser?.profile)


    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (fbUser) => {
          if (fbUser) {
            dispatch(fetchUserProfile(fbUser.uid))
          } else {
            dispatch(clearUserProfile())
          }
        })
        return () => unsub()
    }, [dispatch])

    useEffect(() => {
        if (authUser?.uid && authUser.role) {
            console.log(authUser.role)
          const collectionName =
            authUser.role === 'customer' ? 'customers' : 'businessPartners'

            console.log(collectionName)
          dispatch(
            fetchUserProfileByRole({
              uid: authUser.uid,
              collectionName,
            })
          )
        }
    }, [dispatch, authUser?.uid, authUser?.role])
}