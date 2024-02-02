import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

import Topbar from "@/components/shared/Topbar";
import LeftSidebar from "@/components/shared/LeftSidebar";
import RightSidebar from "@/components/shared/RightSidebar";
import Bottombar from "@/components/shared/Bottombar";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

const categories = [
  { label: "SPORTS", link: "/sports", picturePath: "sports.svg" },
  { label: "POPULAR", link: "/popular", picturePath: "popular.svg" },
  { label: "JUST FOR FUN", link: "/fun", picturePath: "fun.svg" },
  { label: "SCIENCE", link: "/science", picturePath: "science.svg" },
  { label: "OTHER", link: "/other", picturePath: "other.svg" }
];

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
          <Topbar categories={categories}/>  
            <main className="flex mb-10">
                <div className="border 1px white h-100 w-1/5 left-0 mt-16 ">
                   <LeftSidebar/>
                </div>       
                <div className="border 1px white w-full sm:w-3/5 bg-zinc-900 m-auto mt-16">
                    {children}    
                </div>
                <div className="border 1px white h-100 w-1/5 right-0 mt-16">
                  <RightSidebar/>
                </div>    
            </main>
            <div className="border 1px white flex justify-center items-center fixed lg:hidden xl:hidden w-full h-10 bottom-0 bg-zinc-800">
              <Bottombar categories={categories} />
            </div>
            
        </body>
        
      </html>
      </ClerkProvider>
  );
}
