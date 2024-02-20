"use client"

import { RegisterUser } from "@/lib/actions/user/user.actions";
import { IUser } from "@/lib/models/user/user.model";
import { SignUp } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { ClientSession } from "mongodb";
import { Document, Model, Types, DocumentSetOptions, QueryOptions, UpdateQuery, AnyObject, PopulateOptions, MergeType, Query, SaveOptions, ToObjectOptions, FlattenMaps, Require_id, UpdateWithAggregationPipeline, pathsToSkip, Error } from "mongoose";
import { use, useEffect } from "react";

// Define the custom interface for Clerk user attributes
interface ClerkUserAttributes {
  id: string;
  email?: string;
  firstName: string;
  lastName: string;
  // Add other necessary properties
}

export default function Registration() {
  
    const { user, isSignedIn } = useUser();

    useEffect(() => {
        console.log("Use effect-Registration:", user);
        if (user && user.id && isSignedIn) {
          // Assuming user object is available and has an ID property
          handleSignUp(user as ClerkUserAttributes);
        }
      }, [user, isSignedIn]);

  const handleSignUp = async (user: ClerkUserAttributes) => {
    try {
        const newUser: IUser = {
            clerkId: user.id,
            email: user.email,
            name: user.firstName,
            surname: user.lastName,
            sportsClicked: 0,
            popularClicked: 0,
            funClicked: 0,
            scienceClicked: 0,
            otherClicked: 0
        } as IUser

        const response = await RegisterUser(newUser)

      if (response.id) {
        console.log('User registered in database successfully');
      } else {
        console.error('Failed to register user in database');
      }
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <div className="p-10 flex flex-col justify-center items-center">
      <SignUp />
    </div>
  );
}
