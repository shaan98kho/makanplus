"use client"

import { useState } from "react"

import { useSelector } from "react-redux"
import { RootState } from "@/store/store"


export default function UserStatus() {
    const {user} = useSelector((state: RootState) => state.auth)

    return (
        <div></div>
    )
}