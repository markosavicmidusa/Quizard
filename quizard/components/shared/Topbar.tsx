"use client"

import { useClerk, SignInButton, SignOutButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";


interface Category {
    label:string
    link:string
    picturePath:string    
}

interface TopbarProps{
    categories:Category[]
}


export default function Topbar({categories}:TopbarProps){
    
    const { signOut } = useClerk()
    
    return (
        
            <nav className="topbar-container z-10 bg-zinc-900">
                <Link href="/" className="border 1px white flex items-center flex-row gap-4">
                    <Image src="/assets/logoTree.svg" alt="logo" width={28} height={28}/>
                    <p className="text-heading3-bold ">Kvizard</p>
                </Link>
                <div className="border 1px white flex items-center flex-wrap hidden lg:flex">
                    {categories.map((category, index) => (
                        <Link className="text-white px-4 py-2 cursor-pointer transition-transform transform hover:scale-110" key={index} href={category.link}>
                          {category.label}
                        </Link>
                    ))}
                    <Link href="/create-quiz" className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition-transform transform hover:scale-110 flex items-center gap-2">
                             <span>Create Quiz</span>
                     </Link>
                </div>
                <div className="flex items-center gap-1">
                    <div className="block flex items-center">
                        <SignedIn>
                            <div className="border 1px white flex gap-2 p-2 pl-4 cursor-pointer transition-transform transform hover:scale-110">
                                <div className='flex cursor-pointer'>
                                    <UserButton afterSignOutUrl="/"/>
                                </div>
                                <p/>
                            </div>
                        </SignedIn>
                        <SignedOut>   
                            <SignInButton>
                                    <div className="border 1px white flex gap-2 justify-center items-center p-2 cursor-pointer transition-transform transform hover:scale-110">
                                        <p>Sign in</p>
                                        <Image
                                          src='/assets/login.png'
                                          alt='logout'
                                          width={28}
                                          height={28}
                                        />
                                    </div>
                            </SignInButton>
                        </SignedOut>
                    </div>
                </div>
            </nav>
        
    )
}