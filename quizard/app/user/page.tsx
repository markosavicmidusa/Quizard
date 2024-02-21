"use client";

import MainContent from "@/components/shared/MainContent";
import { GetUserByClerkID } from "@/lib/actions/user/user.actions";
import { IUser } from "@/lib/models/user/user.model";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
 
export default function Page() {
 
    const { isLoaded, isSignedIn, user } = useUser();
    const [DbUser, setDbUser] = useState<IUser|null>(null)

    useEffect(() => {

        const fetchUser = async () => {
            
            if (user && user.id) { // Check if user and user.id are defined
                const dbUser = await GetUserByClerkID(user.id);
                setDbUser(dbUser);   
            }
        }

        fetchUser()
    },[user])


    if (!isLoaded || !isSignedIn) {
      return null;
    }

    return <div>Hello, {user.firstName} welcome to Clerk
    <div>Full name, {user.fullName} welcome to Clerk</div>
    <div>ID {user.id} welcome to Clerk</div>
    <div>createdat  {user.createdAt?.toString()} welcome to Clerk</div>
   <h1>here will go list of quizes with approved or waiting prop</h1>
   
   <div>DB User</div>
   {DbUser ? (
        <div>
            <p>ID: {DbUser._id}</p>
            <p>Email: {DbUser.email}</p>
            <p>Name: {DbUser.name}</p>
            <p>Surname: {DbUser.surname}</p>
            {/* Render other properties as needed */}
        </div>
     ) : (
         <div>User data not available</div>
     )}
   <MainContent/>
    </div>;
    
}
