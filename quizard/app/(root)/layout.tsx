import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";

import Topbar from "@/components/shared/Topbar";
import LeftSidebar from "@/components/shared/LeftSidebar";
import RightSidebar from "@/components/shared/RightSidebar";
import Bottombar from "@/components/shared/Bottombar";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Quizmania",
  description: "Quizmania",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="border border-black p-1">
        <body className={`border border-black p-1 ${inter.className}`}>
          <Topbar/>  
            <main className={`border border-black p-1 flex`}>
                <div className="border border-black">
                 <LeftSidebar/>
                </div>
                <section className="main-container">
                  <div>
                    {children}
                  </div>
                </section>
                <div className="border border-black">
                  <RightSidebar/>
                </div>
            </main>
             <Bottombar/>
        </body>
      </html>
    </ClerkProvider>
  );
}
