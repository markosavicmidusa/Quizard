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
      <html lang="en" className="w-full bg-zinc-900 text-slate-300">
        
        <body className={`border 1px white ${inter.className} flex flex-col h-full`}>
          <Topbar/>  
            <main className={` flex flex-row`}>
                <div className=" border 1px white hidden lg:flex md:flex w-1/5 h-full fixed border-1 border-white flex-col left-0 mt-16 mb-10 ">
                   <LeftSidebar/>
                </div>
                
                <div className="border-white w-full sm:w-3/5 flex-col bg-zinc-900 m-auto mb-10 md:mb-0 sm:mb-0">
                    {children}    
                </div>
                <div className=" border 1px white hidden lg:flex md:flex md:mb-10 w-1/5 h-full fixed border-1 border-white flex-col right-0 mt-16">
                  <RightSidebar/>
                </div>    
            </main>
            <Bottombar />
        </body>
        
      </html>
      </ClerkProvider>
  );
}
