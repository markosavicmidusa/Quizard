"use client"

import { Commercial } from "@/data/commercials/commercials"
import Image from "next/image";
import { useState, useEffect } from "react";
import { getCommercials } from "@/data/controller";
import Link from "next/link";


export default function RightSidebar({commercials}: {commercials:Commercial[]}){
    const [currentCommercialIndex, setCurrentCommercialIndex] = useState(0);
    
    useEffect(() => {
        const interval = setInterval(() => {
          setCurrentCommercialIndex((prevIndex) => (prevIndex + 1) % commercials.length);
        }, 10000); // Adjust the interval duration as needed
    
        return () => clearInterval(interval);
      }, [commercials]);

    return(
      <div className="flex flex-col inline-center justify-center w-full p-2">
            
      <div className="flex flex-col inline-center justify-center h-1/2 w-full p-2 border 1px white">
           <Link href={`${commercials[(currentCommercialIndex+3)%commercials.length].link}`}>
              <h1>{`${commercials[(currentCommercialIndex+3)%commercials.length].label}`}</h1>
              <Image
                src={`/commercial/${commercials[(currentCommercialIndex+3)%commercials.length].picturePath}`}
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
           <Link href={`${commercials[(currentCommercialIndex+4)%commercials.length].link}`}>
              <h1>{`${commercials[(currentCommercialIndex+4)%commercials.length].label}`}</h1>
              <Image
                src={`/commercial/${commercials[(currentCommercialIndex+4)%commercials.length].picturePath}`}
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
           <Link href={`${commercials[(currentCommercialIndex+5)%commercials.length].link}`}>
              <h1>{`${commercials[(currentCommercialIndex+5)%commercials.length].label}`}</h1>
              <Image
                src={`/commercial/${commercials[(currentCommercialIndex+5)%commercials.length].picturePath}`}
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