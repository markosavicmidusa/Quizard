import { UserButton } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  return (
    <div className="border 1px white w-full w-5/6 m-auto mt-10 mb-10">
       {/* Block 1: Most Popular Quizes */}
       <div className="items-center w-full border 1px white flex-grow">
         {/* Customize the content for the Most Popular Quizes block */}
         <h2>Most Popular Quizes</h2>
         {/* Add your list of most popular quizes here */}
       </div>

       {/* Block 2: Small Game */}
       <div className="items-center w-full border 1px white flex-grow">
         {/* Customize the content for the Small Game block */}
         <h2>Small Game</h2>
         {/* Add content for the small game here */}
       </div>

       {/* Block 3: Commercial */}
       <div className="items-center w-full border 1px white flex-grow">
         {/* Customize the content for the Commercial block */}
         <h2>Commercial</h2>
         {/* Add your commercial content here */}
       </div>

       {/* Block 4: Random Quizes */}
       <div className="items-center w-full border 1px white flex-grow">
         {/* Customize the content for the Random Quizes block */}
         <h2>Random Quizes</h2>
         {/* Add your content for random quizes here */}
       </div>
    </div>
    
    
  );
}
