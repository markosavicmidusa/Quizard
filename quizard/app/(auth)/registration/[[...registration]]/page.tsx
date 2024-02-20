"use client"

import { RegisterUser } from "@/lib/actions/user/user.actions";
import { IUser } from "@/lib/models/user/user.model";
import { SignUp } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { UserResource } from "@clerk/types";

export default function Registration() {
  
    const { user, isSignedIn } = useUser();

    useEffect(() => {
        console.log("Use effect-Registration:", user);
        if (user && user.id && isSignedIn) {
          // Assuming user object is available and has an ID property
          handleSignUp(user );
        }
      }, [user, isSignedIn]);

  const handleSignUp = async (user : UserResource) => {
    try {
        const newUser: IUser = {
            clerkId: user.id,
            email: user.emailAddresses.toString(),
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
