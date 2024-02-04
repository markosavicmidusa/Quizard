"use client"

import { useEffect, useState } from 'react';
import { Commercial } from "@/data/commercials/commercials"
import Image from "next/image";
import Link from 'next/link';



export default function LeftSidebar({commercials}:{commercials: Commercial[]}){
    
    const [currentCommercialIndex, setCurrentCommercialIndex] = useState(0);
    
    useEffect(() => {
        const interval = setInterval(() => {
          setCurrentCommercialIndex((prevIndex) => (prevIndex + 1) % commercials.length);
        }, 8000); // Adjust the interval duration as needed
    
        return () => clearInterval(interval);
      }, [commercials]);

    return(
        <div className="flex flex-col inline-center justify-center w-full p-2">
            
            <div className="flex flex-col inline-center justify-center h-1/2 w-full p-2 border 1px white">
                 <Link href={`${commercials[(currentCommercialIndex+0)%commercials.length].link}`}>
                    <h1>{`${commercials[(currentCommercialIndex+0)%commercials.length].label}`}</h1>
                    <Image
                      src={`/commercial/${commercials[(currentCommercialIndex+0)%commercials.length].picturePath}`}
                      alt="Commercial Image"
                      layout="fixed"
                      width={350}  // Set your desired fixed width
                      height={200} // Set your desired fixed height
                      objectFit="contain"
                      className="object-cover"
                    />
                 </Link>     
            </div>
            <div className="flex flex-col inline-center justify-center h-1/2 w-full p-2 border 1px white">
                 <Link href={`${commercials[(currentCommercialIndex+1)%commercials.length].link}`}>
                    <h1>{`${commercials[(currentCommercialIndex+1)%commercials.length].label}`}</h1>
                    <Image
                      src={`/commercial/${commercials[(currentCommercialIndex+1)%commercials.length].picturePath}`}
                      alt="Commercial Image"
                      layout="fixed"
                      width={350}  // Set your desired fixed width
                      height={200} // Set your desired fixed height
                      objectFit="contain"
                      className="object-cover"
                    />
                 </Link>     
            </div>
            <div className="flex flex-col inline-center justify-center h-1/2 w-full p-2 border 1px white">
                 <Link href={`${commercials[(currentCommercialIndex+2)%commercials.length].link}`}>
                    <h1>{`${commercials[(currentCommercialIndex+2)%commercials.length].label}`}</h1>
                    <Image
                      src={`/commercial/${commercials[(currentCommercialIndex+2)%commercials.length].picturePath}`}
                      alt="Commercial Image"
                      layout="fixed"
                      width={350}  // Set your desired fixed width
                      height={200} // Set your desired fixed height
                      objectFit="contain"
                      className="object-cover"
                    />
                 </Link>     
            </div>
           
        </div>
    ) 
        
}