import mongoose, { Document, Schema, Types, Model } from "mongoose";

<<<<<<< HEAD
// Define the interface for the Answers document
export interface IAnswers {
=======
// Subdocument definition for answers
interface Answer {
>>>>>>> f2e50af0eaf01d417261fd79ab5548ee1b583f4c
    value: string;
    isCorrect: boolean;
}

<<<<<<< HEAD
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
=======
// Subdocument definition for questions
interface Question {
    question: string;
    answers: Answer[];
}

// Subdocument definition for results
interface Result {
>>>>>>> f2e50af0eaf01d417261fd79ab5548ee1b583f4c
    from: number;
    to: number;
    result: string;
}

<<<<<<< HEAD
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
=======
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
>>>>>>> f2e50af0eaf01d417261fd79ab5548ee1b583f4c

// Export the Quiz model
export default QuizModel ;
