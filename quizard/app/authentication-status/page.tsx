"use client"

import { RegisterUser } from "@/lib/actions/user/user.actions";
import { IUser } from "@/lib/models/user/user.model";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { UserResource } from "@clerk/types";

export default function AuthenticationStatus() {
    const { isSignedIn, user, isLoaded } = useUser();

    useEffect(() => {
        console.log("Use effect-isLoaded:", isLoaded);
        console.log("Use effect-isSignedIn:", isSignedIn);
        console.log("Use effect-User:", user);
        
        // Check if user is defined and has an id property
        if (user?.id) {
          handleSignUp(user);
        }
      }, []);

    const handleSignUp = async (user: UserResource) => {
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
        <div>
            AuthenticationStatus
            Is Loaded: {isLoaded ? "Yes" : "No"}<br />
            Is Signed In: {isSignedIn ? "Yes" : "No"}<br />
            User ID: {user?.id}<br />
            Email: {user?.emailAddresses.toString()}<br />
            First Name: {user?.firstName}<br />
            Last Name: {user?.lastName}<br />
        </div>
    );
}
