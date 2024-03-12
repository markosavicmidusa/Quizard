"use server"

import UserModel, { IUser } from "@/lib/models/user/user.model";
import { connectToDB } from "@/lib/mongoose";

export async function GetUserByClerkID(id: string): Promise<IUser | null> {
    try {
        const user: IUser | null = await UserModel.findOne({ clerkId: id });

        // Map the quizzes to plain objects
        let plainObject: IUser;
        if(user){
            plainObject = {
                id: user._id.toString(), // Convert ObjectId to string
                clerkId: user.clerkId,
                name: user.name,
                surname: user.surname,
                sportsClicked: user.sportsClicked,
                popularClicked: user.popularClicked,
                funClicked: user.funClicked,
                scienceClicked: user.scienceClicked,
                otherClicked: user.otherClicked
            } as IUser
        }
        return user;

    } catch (error) {
        console.error("Error retrieving user by Clerk ID:", error);
        return null;
    }
}

export async function RegisterUser(user:IUser): Promise<IUser>{
    
    connectToDB();
    
    try {
        const newUser = await UserModel.create(user)
        //console.log("User registered successfully:", newUser);
        return user
    } catch (error) {
        //console.error("Error registering user:", error);
        throw error; // Propagate the error to the caller
    }
    
}



