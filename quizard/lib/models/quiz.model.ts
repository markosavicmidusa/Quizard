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
    questionss: [{
        questionn: { type: String, required: true },
        answerss: [{
            valuee: { type: String, required: true },
            isCorrectt: { type: Boolean, required: true }
        }]
    }],
    resultss: [{
        fromm: { type: Number, required: true },
        too: { type: Number, required: true },
        resultt: { type: String, required: true }
    }],
    active: {type: Number, required:true
    }
});

const QuizModel = mongoose.models.Quiz || mongoose.model<IQuiz>('Quiz', QuizSchema);

export default QuizModel;
