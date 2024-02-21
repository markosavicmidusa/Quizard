"use client";

import Quiz from "@/components/cards/Quiz";
import MainContent from "@/components/shared/MainContent";
import GetQuizMetadataListByUserId from "@/lib/actions/quiz.actions";
import { GetUserByClerkID } from "@/lib/actions/user/user.actions";
import { IQuizMetadata } from "@/lib/models/quiz_metadata.model";
import { IUser } from "@/lib/models/user/user.model";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
 
export default function Page() {
 
    const { isLoaded, isSignedIn, user } = useUser();
    const [DbUser, setDbUser] = useState<IUser|null>(null)
    const [QuizMetadata, setQuizMetadata] = useState<IQuizMetadata[]|null>(null)
    const [QuizMetadataLoaded, setQuizMetadataLoaded] = useState(false)

    useEffect(() => {
        const fetchUser = async () => {
            
            if (user && user.id) { // Check if user and user.id are defined
                const dbUser = await GetUserByClerkID(user.id);
                setDbUser(dbUser);   
            }
        }
        fetchUser()
    },[user])

    useEffect(()=>{
        
    const fetchQuizesMetadata= async ()=>{
        try {
            const quizMetadataByUserId = await GetQuizMetadataListByUserId(DbUser?._id)
            if(quizMetadataByUserId){
                setQuizMetadataLoaded(true)
                setQuizMetadata(quizMetadataByUserId)
            }
        } catch (error) {
            console.log("GetQuizMetadataListByUserId/useEffect/user-page error:", error)
        }
    }

        fetchQuizesMetadata()
    },[user,DbUser])


    if (!isLoaded || !isSignedIn) {
      return null;
    }

    return <div>
        Hello, {user.firstName} welcome to Clerk
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
     <div>
        <h2> Your quizes list</h2>
        {QuizMetadataLoaded ? (
             <div className="overflow-y-scroll max-h-64 w-full">
             <ul className="flex flex-wrap gap-4 items-center justify-center">
                 {QuizMetadata?.map((quiz) => (
                     <Quiz key={quiz.id} quiz={quiz}/>
                 ))}
             </ul>
         </div>
         ) : (
             <div>Loading quizzes...</div>
         )}
        
     </div>
   <MainContent/>
    </div>;
    
}
