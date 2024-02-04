"use client"

import Image from "next/image";
import { useState, useEffect } from "react";
import { getCommercials } from "@/data/controller";



export default function MainContent() {
 
  const commercials = getCommercials()

  const [currentCommercialIndex, setCurrentCommercialIndex] = useState(0);
 
  useEffect(() => {
    console.log("Component Mounted"); // Log when the component is mounted
  
    const interval = setInterval(() => {
      setCurrentCommercialIndex((prevIndex) => (prevIndex + 1) % commercials.length);
      console.log("Log inside setInterval"); // Log each time the interval function is executed
    }, 10000);
  
    return () => {
      console.log("Component Unmounted"); // Log when the component is unmounted
      clearInterval(interval);
    };
  }, []);
 
 
  return (
    <div className="border 1px white h-full flex flex-col bg-pink-600 flex grow p-10">
       
       {/* Block 1: Most Popular Quizes */}
       <div className="flex flex-col flex-wrap w-full p-10 border 1px white ">
         
         <h2>Most Popular Quizes</h2>
         <h2>Most Popular Quizes</h2>
         <h2>Most Popular Quizes</h2>
         <h2>Most Popular Quizes</h2>
         <h2>Most Popular Quizes</h2>
         <h2>Most Popular Quizes</h2>
         <h2>Most Popular Quizes</h2>

       </div>

       {/* Block 3: Commercial */}
       <div className="flex flex-grid items-center justify-center w-full p-2 border 1px white lg:hidden xl:hidden">
       <h2>Commercial</h2>
        <Image
          src={`/commercial/${commercials[(currentCommercialIndex+1)%commercials.length].picturePath}`}
          alt="Commercial Image"
          layout="fixed"
          width={350}  // Set your desired fixed width
          height={260} // Set your desired fixed height
          objectFit="cover"
        />
         
       </div>

       {/* Block 2: Small Game */}
       <div className="flex flex-col justify-center w-full p-2 border 1px white h-2/8">
         <h1>Small Game</h1>
         <h1>Small Game</h1>
         <h1>Small Game</h1>
         <h1>Small Game</h1>
         <h1>Small Game</h1>
         <h1>Small Game</h1>
       </div>

        {/* Block 3: Commercial */}
        <div className="flex flex-grid items-center justify-center w-full p-2 border 1px white lg:hidden xl:hidden">
       <h2>Commercial</h2>
        <Image
          src={`/commercial/${commercials[(currentCommercialIndex+2)%commercials.length].picturePath}`}
          alt="Commercial Image"
          layout="fixed"
          width={150}  // Set your desired fixed width
          height={150} // Set your desired fixed height
          objectFit="contain"
          className="object-cover"
        />
         
       </div>
      
       {/* Block 4: Random Quizes */}
       <div className="flex flex-col justify-center w-full p-2 border 1px white h-2/8">
         <h1>Random Quizes</h1>
         <h1>Random Quizes</h1>
         <h1>Random Quizes</h1>
         <h1>Random Quizes</h1>
         <h1>Random Quizes</h1>
         <h1>Random Quizes</h1>
         <h1>Random Quizes</h1>
       </div>

       {/* Block 5: Small Game */}
       <div className="flex flex-col justify-center w-full p-2 border 1px white h-2/8">
       <h1>Small Game</h1>
         <h1>Small Game</h1>
         <h1>Small Game</h1>
         <h1>Small Game</h1>
         <h1>Small Game</h1>
         <h1>Small Game</h1>
       </div>

       {/* Block 6: Commercial */}
       <div className="flex flex-grid items-center justify-center w-full p-2 border 1px white lg:hidden xl:hidden">
       <h2>Commercial</h2>
        <Image
          src={`/commercial/${commercials[(currentCommercialIndex+3)%commercials.length].picturePath}`}
          alt="Commercial Image"
          layout="fixed"
          width={150}  // Set your desired fixed width
          height={150} // Set your desired fixed height
          objectFit="contain"
          className="object-cover"
        />
      </div>


      {/* Block 7: Random Quizes */}
      <div className="flex flex-col justify-center w-full p-2 border 1px white h-2/8">
         <h1>Random Quizes</h1>
         <h1>Random Quizes</h1>
         <h1>Random Quizes</h1>
         <h1>Random Quizes</h1>
         <h1>Random Quizes</h1>
         <h1>Random Quizes</h1>
         <h1>Random Quizes</h1>
       </div>

       {/* Block 8: Small Game */}
       <div className="flex justify-center w-full p-2 border 1px white h-2/8">
         <h2>Small Game</h2>
       </div>

       {/* Block 9: Commercial */}
       <div className="flex flex-grid items-center justify-center w-full p-2 border 1px white lg:hidden xl:hidden">
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

      {/* Block 7: Random Quizes */}
      <div className="flex justify-center w-full p-2 border 1px white h-2/8">
         <h2>Random Quizes</h2>
       </div>

       {/* Block 8: Small Game */}
       <div className="flex justify-center w-full p-2 border 1px white h-2/8">
         <h2>Small Game</h2>
       </div>

       {/* Block 9: Commercial */}
       <div className="flex flex-grid items-center justify-center w-full p-2 border 1px white lg:hidden xl:hidden">
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

      {/* Block 7: Random Quizes */}
      <div className="flex justify-center w-full p-2 border 1px white h-2/8">
         <h2>Random Quizes</h2>
       </div>

       {/* Block 8: Small Game */}
       <div className="flex justify-center w-full p-2 border 1px white h-2/8">
         <h2>Small Game</h2>
       </div>

       {/* Block 9: Commercial */}
       <div className="flex flex-grid items-center justify-center w-full p-2 border 1px white lg:hidden xl:hidden">
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


    </div>
    

    


    
  );
}