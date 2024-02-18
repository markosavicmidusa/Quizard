"use client";
import { useUser } from "@clerk/nextjs";
 
export default function Page() {
 
    const { isLoaded, isSignedIn, user } = useUser();
 
    if (!isLoaded || !isSignedIn) {
      return null;
    }
   
    return <div>Hello, {user.firstName} welcome to Clerk
    <div>Full name, {user.fullName} welcome to Clerk</div>
    <div>ID {user.id} welcome to Clerk</div>
    <div>createdat  {user.createdAt?.toString()} welcome to Clerk</div>
   <h1>here will go list of quizes with approved or waiting prop</h1>
    </div>;
}
