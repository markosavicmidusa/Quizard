import { SignIn, SignInButton, SignOutButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export default function Topbar(){
    return (
        
            <nav className="topbar-container">
                <Link href="/" className="flex items-center flex-row gap-4">
                    <Image src="/assets/logoTree.svg" alt="logo" width={28} height={28}/>
                    <p className="text-heading3-bold ">Kvizard</p>
                </Link>
                <div className="flex items-center gap-1">
                    <div className="block">
                    <SignedIn>
                        <SignOutButton>
                            <div className='flex cursor-pointer'>
                                <Image
                                  src='/assets/logout.png'
                                  alt='logout'
                                  width={24}
                                  height={24}
                                />
                            </div>
                        </SignOutButton>
                    </SignedIn>
                    <SignedOut>
                        <SignInButton>
                            <Image
                              src='/assets/login.png'
                              alt='logout'
                              width={24}
                              height={24}
                            />
                        </SignInButton>
                    </SignedOut>
                    </div>
                </div>
            </nav>
        
    )
}