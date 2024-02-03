"use client"

import { useEffect, useState } from 'react';
import { Commercial } from "@/data/commercials/commercials"
import Image from "next/image";



export default function LeftSidebar({commercials}:{commercials: Commercial[]}){
    
    const [currentCommercialIndex, setCurrentCommercialIndex] = useState(0);
    
    useEffect(() => {
        const interval = setInterval(() => {
          setCurrentCommercialIndex((prevIndex) => (prevIndex + 1) % commercials.length);
        }, 5000); // Adjust the interval duration as needed
    
        return () => clearInterval(interval);
      }, [commercials]);

    return(
        <div className="flex flex-col inline-center justify-center p-10">
            <div className="flex-grid h-1/2 w-full p-4 border 1px white">
            <h2>Commercial</h2>
                 <Image
                   src={`/commercial/${commercials[(currentCommercialIndex+4)%commercials.length].picturePath}`}
                   alt="Commercial Image"
                   layout="fixed"
                   width={150}  // Set your desired fixed width
                   height={150} // Set your desired fixed height
                   objectFit="contain"
                   className="object-cover"
                 />
            </div>
            <div className="flex-grid h-1/2 w-full p-4 border 1px white">
              <h2>Commercial</h2>
                 <Image
                   src={`/commercial/${commercials[(currentCommercialIndex+1)%commercials.length].picturePath}`}
                   alt="Commercial Image"
                   layout="fixed"
                   width={150}  // Set your desired fixed width
                   height={150} // Set your desired fixed height
                   objectFit="contain"
                   className="object-cover"
                 />
            </div>
           
        </div>
    ) 
        
}