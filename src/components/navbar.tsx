"use client"

import React from "react"
import Link from "next/link"
import "./../app/globals.css"
import { Cinzel } from "next/font/google"
import { usePathname } from "next/navigation"

interface NavItm {
    label: string,
    path: string,
}

interface NavbarProps {
    hrefs: NavItm[],
}

export default function NavBar({hrefs}: NavbarProps) {
    const path = usePathname()
    const navList = hrefs.map((href, index) => {
        return <Link
            href={href.path}
            className={`${path === href.path ? "active font-bold" : ""}`}
            key={index}
        >{href.label}</Link>
    })

    return <nav className="navbar flex gap-12 items-center justify-end">
            <Link href="/" className="logo mr-auto">MAKAN+</Link>
            {navList}
        </nav>
}