import { useSelector } from "react-redux"
import { RootState } from "@/store/store"

export function useCurrentUser() {
    return useSelector((state: RootState) => state.user.curUser)
}