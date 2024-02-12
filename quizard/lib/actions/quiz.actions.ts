"use server"
import QuizModel, { IQuiz } from "../models/quiz.model";
import QuizMetadataModel, { IQuizMetadata } from "../models/quiz_metadata.model";
import { connectToDB } from "../mongoose";


export async function getQuizById(id:string): Promise<IQuiz>{
    try {
        
        connectToDB();
        // Find the quiz by ID
        const quiz = await QuizModel.findOne({ _id: id });
     
        return quiz;
  
    } catch (error) {
        console.error("Error fetching quiz by ID:", error);
        throw error; // Rethrow the error to be handled by the caller
        
    }
} 



export async function getMostPopular50Quizzes(): Promise<IQuizMetadata[] | []>{
    try {
        
        connectToDB();
        // Fetch the first 50 quizzes as plain JavaScript objects
        const quizzes = await QuizMetadataModel.find()
            .lean()
            .sort({ timesClicked: -1, timesFinished: -1 })
            .limit(50);


        // Manually convert each document to a plain object
        const plainObjects: IQuizMetadata[] = quizzes.map(quiz => ({
            id: quiz.id,
            name: quiz.name,
            title: quiz.title,
            category: quiz.category,
            createdBy: quiz.createdBy,
            timesClicked: quiz.timesClicked,
            timesFinished: quiz.timesFinished
        })) as IQuizMetadata[]; // Explicit cast to IQuizMetadata[];


        return plainObjects;
    } catch (error) {
        console.error("Error fetching quizzes:", error);
         //throw error; // Rethrow the error to be handled by the caller
        return []
    }
}
