import React from "react"
import Link from "next/link"
import { FaYoutube, FaGithub } from "react-icons/fa"


export default function Footer() {
    return <footer className="flex items-start justify-start gap-3 mt-auto">
        <div className="flex-1">
            <Link href="/" className="logo block pb-3">MAKAN+</Link>
            <div className="external-links flex items-center gap-2">
                <a target="_blank" href="https://github.com/shaan98kho/makanplus" rel="noopener noreferrer"
                ><FaGithub/></a>
                <a ><FaYoutube/></a>
            </div>
            <div>

                <p></p>
                <p></p>
            </div>
        </div>
        <div className="flex-1"></div>
        <div className="flex-1"></div>
        
    </footer>
}