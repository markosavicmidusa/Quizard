"use server"

import { connectToDB } from "../mongoose"

export async function getAllQuizesList(){
    connectToDB();
}