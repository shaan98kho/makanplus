import "./globals.css"

import { Providers } from "@/components/providers"
import { PersistGate } from "redux-persist/integration/react"
import { store, persistor } from "@/store/store"

import NavBar from "@/components/navbar"
import Footer from "@/components/footer"
import ClientProviders from "@/components/clientComponents"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="">
        <div className="flex flex-col min-h-screen w-full">
          <ClientProviders>
            <NavBar />
              <main className="px-8 py-3">
                {children}
              </main>
              <Footer />

          </ClientProviders>
        </div>
      </body>
    </html>
  );
}
