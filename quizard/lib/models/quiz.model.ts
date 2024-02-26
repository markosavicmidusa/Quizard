import mongoose, { Document, Schema, Types, Model } from "mongoose";

// Subdocument definition for answers
interface Answer {
    value: string;
    isCorrect: boolean;
}

// Subdocument definition for questions
interface Question {
    question: string;
    answers: Answer[];
}

// Subdocument definition for results
interface Result {
    from: number;
    to: number;
    result: string;
}

// Document definition for the quiz
export interface IQuiz extends Document {
    questions: Question[];
    results: Result[];
    active: number;
}

// Define the answer subdocument schema
const answerSchema = new Schema<Answer>({
    value: String,
    isCorrect: Boolean
}, { _id: false });

// Define the question subdocument schema
const questionSchema = new Schema<Question>({
    question: String,
    answers: [answerSchema] // Array of answer subdocuments
}, { _id: false });

// Define the result subdocument schema
const resultSchema = new Schema<Result>({
    from: Number,
    to: Number,
    result: String
}, { _id: false });

// Define the main quiz schema
const QuizSchema = new Schema<IQuiz>({
    questions: [questionSchema], // Array of question subdocuments
    results: [resultSchema], // Array of result subdocuments
    active: Number
});

// Define the type for the document properties
type QuizDocumentProps = {
    questions: Types.DocumentArray<Question>;
    results: Types.DocumentArray<Result>;
};

// Define the type for the model
type QuizModelType = Model<IQuiz, {}, QuizDocumentProps>;

// Create the model
const QuizModel = mongoose.models.Quiz || mongoose.model<IQuiz, QuizModelType>('Quiz', QuizSchema);

export default QuizModel;
