"use client"

import "./../app/globals.css"

import React, { useRef, useState } from "react"
import Link from "next/link"

import { usePathname } from "next/navigation"

import useWindowSize from "@/hooks/useWindowSize"
import useOnClickOutside from "@/hooks/useOnClickOutside"

import { IoMenuOutline, IoClose } from "react-icons/io5"

interface NavItm {
    label: string,
    path: string,
}

interface NavbarProps {
    hrefs: NavItm[],
}

export default function NavBar({hrefs}: NavbarProps) {
    const path = usePathname()
    const { width } = useWindowSize()
    const [isPanelOpen, setIsPanelOpen] = useState(false)
    
    const handleTogglePanel = () => {
        setIsPanelOpen((prev) => !prev)
    }

    const closePanel = () => {
        setIsPanelOpen(false)
    }

    const ref = useRef<HTMLDivElement>(null)
    useOnClickOutside({ref: ref, handler: closePanel})

    const navList = hrefs.map((href, index) => {
        return <Link
            href={href.path}
            className={`cursor-pointer ${path === href.path ? "active font-bold" : ""}`}
            key={index}
            onClick={width && width < 910 ? closePanel : undefined}
        >{href.label}</Link>
    })

    return <>
        <nav className="navbar flex gap-12 items-center justify-end">
            <Link href="/" className="logo mr-auto cursor-pointer">MAKAN+</Link>

            {width && width < 910 
            ? (<button className="w-9 h-9" onClick={handleTogglePanel}><IoMenuOutline className="w-full h-full cursor-pointer" /></button>)
            : navList
            }
        </nav>
        {width && width < 910 && (
            <div ref={ref} className={`nav-panel fixed top-0 right-0 w-[80%] h-full z-[1] transition-transform duration-300 ease-out transform flex items-center justify-start flex-col gap-8 ${isPanelOpen ? "translate-x-0" : "translate-x-full"}`}>
                <button className="w-9 h-9 absolute right-8 top-[18px]" onClick={handleTogglePanel}><IoClose className="w-full h-full cursor-pointer" /></button>
                {navList}
            </div>
        )}
    </>
}