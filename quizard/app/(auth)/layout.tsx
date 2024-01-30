import { ClerkProvider } from "@clerk/nextjs"
import { Inter } from "next/font/google"

import '../globals.css'

export const metadata = {
    title: 'Quizard',
    description: 'Quizard use premium user benefits with Quizard'
}

const inter = Inter({subsets: ["latin"]})

export default function RootLayout( {children}: Readonly<{children:React.ReactNode}> ){
    return(
        <ClerkProvider>
            <html lang="en">
                <body className={`${inter.className} bg-dark-1`}>
                    {children}
                </body>
            </html>
        </ClerkProvider>
    )
}
