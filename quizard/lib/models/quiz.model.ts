import mongoose, { Document } from "mongoose";

// Define the interface for the Answers document
export interface IAnswers {
    value: string;
    isCorrect: boolean;
}

// Define the Answers schema
const AnswersSchema = new mongoose.Schema<IAnswers>({
    value: String,
    isCorrect: Boolean
});

// Define the interface for the Question document
export interface IQuestion {
    question: string;
    answers: IAnswers[];
}

// Define the Question schema
const QuestionSchema = new mongoose.Schema<IQuestion>({
    question: String,
    answers: [AnswersSchema] // Embed the Answers schema
});

// Define the interface for the Result document
export interface IResult {
    from: number;
    to: number;
    result: string;
}

// Define the Result schema
const ResultSchema = new mongoose.Schema<IResult>({
    from: Number,
    to: Number,
    result: String
});

// Define the interface for the Quiz document
export interface IQuiz extends Document {
    questions: IQuestion[];
    results: IResult[];
    active: number;
}

// Define the Quiz schema
const QuizSchema = new mongoose.Schema<IQuiz>({
    questions: [QuestionSchema], // Embed the Question schema
    results: [ResultSchema], // Embed the Result schema
    active: Number
});

// Define the Quiz model using the schema
const QuizModel = mongoose.models.Quiz || mongoose.model<IQuiz>('Quiz', QuizSchema);

// Export the Quiz model
export default QuizModel ;
