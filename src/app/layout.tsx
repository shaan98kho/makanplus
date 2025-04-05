import type { Metadata } from "next"
import { Geist, Geist_Mono, Cinzel } from "next/font/google"
import "./globals.css"
import NavBar from "@/components/navbar"
import Footer from "@/components/footer"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="">
        <div className="flex flex-col min-h-screen w-full">
          <NavBar hrefs={[
            {label: "Home", path: "/"},
            {label: "About Us", path: "/about"},
            {label: "Market", path: "/market"},
            {label: "Sign In", path: "/auth/login"},
          ]}/>
          <main className="px-8 py-3">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
