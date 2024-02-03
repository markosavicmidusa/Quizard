"use client"

import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { useState, useEffect } from "react";


const commercialImages = [
  "/commercial/coca-cola.png",
  "/commercial/dragon.png",
  "/commercial/mek.png",
  "/commercial/pepsi.png",
  "/commercial/trpkovic.png",
];



export default function Home() {
 
 
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
 
  useEffect(() => {
    console.log("Component Mounted"); // Log when the component is mounted
  
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % commercialImages.length);
      console.log("Log inside setInterval"); // Log each time the interval function is executed
    }, 10000);
  
    return () => {
      console.log("Component Unmounted"); // Log when the component is unmounted
      clearInterval(interval);
    };
  }, []);
 
 
  return (
    <div className="border 1px white p-2 h-full flex flex-col">
       
       {/* Block 1: Most Popular Quizes */}
       <div className="flex flex-wrap w-full p-10 border 1px white ">
         
         <h2>Most Popular Quizes</h2>

       </div>

       {/* Block 3: Commercial */}
       <div className="flex flex-col items-center justify-center w-full p-2 border 1px white lg:hidden xl:hidden">
       <h2>Commercial</h2>
        <Image
          src={commercialImages[currentImageIndex]}
          alt="Commercial Image"
          layout="fixed"
          width={150}  // Set your desired fixed width
          height={150} // Set your desired fixed height
          objectFit="contain"
          className="object-cover"
        />
         
       </div>

       {/* Block 2: Small Game */}
       <div className="flex justify-center w-full p-2 border 1px white h-2/8">
         <h2>Small Game</h2>
       </div>

        {/* Block 3: Commercial */}
        <div className="flex flex-col items-center justify-center w-full p-2 border 1px white lg:hidden xl:hidden">
       <h2>Commercial</h2>
        <Image
          src={commercialImages[(currentImageIndex+3)%commercialImages.length]}
          alt="Commercial Image"
          layout="fixed"
          width={150}  // Set your desired fixed width
          height={150} // Set your desired fixed height
          objectFit="contain"
          className="object-cover"
        />
         
       </div>
      
       {/* Block 4: Random Quizes */}
       <div className="flex justify-center w-full p-2 border 1px white h-2/8">
         <h2>Random Quizes</h2>
       </div>

       {/* Block 5: Small Game */}
       <div className="flex justify-center w-full p-2 border 1px white h-2/8">
         <h2>Small Game</h2>
       </div>

       {/* Block 6: Commercial */}
       <div className="flex flex-col items-center justify-center w-full p-2 border 1px white lg:hidden xl:hidden">
       <h2>Commercial</h2>
        <Image
          src={commercialImages[(currentImageIndex+2)%commercialImages.length]}
          alt="Commercial Image"
          layout="fixed"
          width={150}  // Set your desired fixed width
          height={150} // Set your desired fixed height
          objectFit="contain"
          className="object-cover"
        />
      </div>


      {/* Block 7: Random Quizes */}
      <div className="flex justify-center w-full p-2 border 1px white h-2/8">
         <h2>Random Quizes</h2>
       </div>

       {/* Block 8: Small Game */}
       <div className="flex justify-center w-full p-2 border 1px white h-2/8">
         <h2>Small Game</h2>
       </div>

       {/* Block 9: Commercial */}
       <div className="flex flex-col items-center justify-center w-full p-2 border 1px white lg:hidden xl:hidden">
       <h2>Commercial</h2>
        <Image
          src={commercialImages[(currentImageIndex+2)%commercialImages.length]}
          alt="Commercial Image"
          layout="fixed"
          width={150}  // Set your desired fixed width
          height={150} // Set your desired fixed height
          objectFit="contain"
          className="object-cover"
        />
      </div>


    </div>
    

    


    
  );
}
