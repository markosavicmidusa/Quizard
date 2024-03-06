import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

import Topbar from "@/components/shared/Topbar";
import LeftSidebar from "@/components/shared/LeftSidebar";
import RightSidebar from "@/components/shared/RightSidebar";
import Bottombar from "@/components/shared/Bottombar";
import Head from "next/head";
import {dark} from "@clerk/themes"

const inter = Inter({ subsets: ["latin"] });

import { getCategories, getCommercials } from "@/data/controller";


const categories = getCategories();


export const metadata: Metadata = {
  title: "Quizmania",
  description: "Quizmania",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const commercials = getCommercials()

  return (
  
    <ClerkProvider appearance={{baseTheme:dark}}>
      <html lang="en" className="w-full h-screen bg-zinc-800 text-slate-300 h-full overflow-y-scroll" style={{ scrollbarWidth: 'thin', scrollbarColor: '#CBD5E0 #27272A'}}>
        {/**className="overflow-y-scroll max-h-64 w-full" style={{ scrollbarWidth: 'thin', scrollbarColor: '#CBD5E0 #27272A'}} */}
        <body className={`${inter.className} flex flex-col`}>
          <Topbar categories={categories} />  
            <main className="flex mb-10 h-full">
                <div className="fixed w-1/5 left-0 mt-16 hidden xl:flex lg:flex">
                   <LeftSidebar commercials={commercials}/>
                </div>       
                <div className="bg-zinc-800 mx-auto mt-16 w-full sm:w-full md:w-full lg:w-3/5 xl:w-3/5 flex flex-col">
                    {children}    
                </div>
                <div className="fixed w-1/5 right-0 mt-16 f-full hidden xl:flex lg:flex">
                  <RightSidebar commercials={commercials} />
                </div>    
            </main>
            <div className="flex justify-center items-center fixed lg:hidden xl:hidden w-full h-11 bottom-0 bg-zinc-900">
              <Bottombar categories={categories} />
            </div>
        </body>  
      </html>
      </ClerkProvider>
  );
}
