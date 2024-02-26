import mongoose, { Document } from "mongoose";

export interface IQuiz extends Document {
    questions: Array<{
        question: string;
        answers: Array<{
            value: string;
            isCorrect: boolean;
        }>;
    }>;
    results: Array<{
        from: number;
        to: number;
        result: string;
    }>;
    active: number
}

const QuizSchema = new mongoose.Schema({
    questions: [{
        question: String,
        answers: [{
            value: String,
            isCorrect: Boolean
        }]
    }],
    results: [{
        from: Number,
        to: Number,
        result: String
    }],
    active: Number
    }
);

const QuizModel = mongoose.models.Quiz || mongoose.model<IQuiz>('Quiz', QuizSchema);

export default QuizModel;
