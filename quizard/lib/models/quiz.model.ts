import mongoose from "mongoose";

// QuizSchema start
const AnswerSchema = new mongoose.Schema({
    value: { type: String, required: true },
    isCorrect: { type: Boolean, required: true },
});

const ResultsSchema = new mongoose.Schema({
    range: {
        from: { type: Number, required: true },
        to: { type: Number, required: true }
    },
    result: { type: String, required: true }
});

const QuestionSchema = new mongoose.Schema({
    question: { type: String, required: true },
    answers: { type: [AnswerSchema], required: true }   
})

const QuizSchema = new mongoose.Schema({
    questions: { type: [QuestionSchema], required: true },
    results: { type: [ResultsSchema], required: true }
});

// Define the interface for Quiz document
export interface IQuiz extends Document {
    questions: Array<{
        question: string;
        answers: Array<{
            value: string;
            isCorrect: boolean;
        }>;
    }>;
    results: Array<{
        range: {
            from: number;
            to: number;
        };
        result: string;
    }>;
}


const QuizModel = mongoose.models.Quiz || mongoose.model('Quiz', QuizSchema)

export default QuizModel