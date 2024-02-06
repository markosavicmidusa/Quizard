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
    category: { type: String, required: true },
    questions: { type: [QuestionSchema], required: true },
    results: { type: [ResultsSchema], required: true }
});

const QuizModel = mongoose.models.Quiz || mongoose.model('Quiz', QuizSchema)

export default QuizModel
