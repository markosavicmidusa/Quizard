"use client"

import { useState } from 'react';
import { IQuiz } from '@/lib/models/quiz.model'; // Import the interface for the quiz

export default function CreateQuiz() {
    const initialQuizState: IQuiz = {
        questions: Array.from({ length: 6 }, () => ({
            question: '',
            answers: [
                { value: '', isCorrect: true },
                { value: '', isCorrect: false },
                { value: '', isCorrect: false }
            ]
        })),
        results: [
            { from: 0, to: 50, result: '' },
            { from: 50, to: 85, result: '' },
            { from: 85, to: 100, result: '' }
        ]
    } as IQuiz;

    const [quiz, setQuiz] = useState(initialQuizState);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const handleNextQuestion = () => {
        if (currentQuestionIndex < quiz.questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handlePrevQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const handleQuestionChange = (field: string, value: any) => {
        {/*setQuiz(prevState => {
            const newQuestions = [...prevState.questions];
            newQuestions[currentQuestionIndex] = {
                ...newQuestions[currentQuestionIndex],
                [field]: value
            };
            return { ...prevState, questions: newQuestions };
        });*/}
    };

    const handleResultChange = (index: number, field: string, value: any) => {
        {/*setQuiz(prevState => {
            const newResults = [...prevState.results];
            newResults[index] = { ...newResults[index], [field]: value };
            return { ...prevState, results: newResults };
        });*/}
    };
    const handleSubmit = () => {
        // Implement submission logic here
        console.log('Quiz submitted:', quiz);
    };

    return (
        <div>
            <h1>Create Quiz</h1>
            <form>
                <div key={currentQuestionIndex}>
                    <h3>Question {currentQuestionIndex + 1}</h3>
                    <input
                        type="text"
                        placeholder="Question"
                        value={quiz.questions[currentQuestionIndex].question}
                        onChange={e => handleQuestionChange('question', e.target.value)}
                    />
                    {quiz.questions[currentQuestionIndex].answers.map((answer, answerIndex) => (
                        <div key={answerIndex}>
                            <input
                                type="text"
                                placeholder={`Answer ${answerIndex + 1}`}
                                value={answer.value}
                                onChange={e => handleQuestionChange('value', e.target.value)}
                            />
                        </div>
                    ))}
                </div>
                <div>
                    {currentQuestionIndex > 0 && (
                        <button type="button" onClick={handlePrevQuestion}>
                            {"<"} Previous
                        </button>
                    )}
                    {currentQuestionIndex < quiz.questions.length - 1 && (
                        <button type="button" onClick={handleNextQuestion}>
                            Next {">"}
                        </button>
                    )}
                </div>
                {currentQuestionIndex === quiz.questions.length - 1 && (
                    <div>
                        <h2>Results</h2>
                        {quiz.results.map((result, index) => (
                            <div key={index}>
                                <input
                                    type="text"
                                    placeholder={`Result ${index + 1}`}
                                    value={result.result}
                                    onChange={e => handleResultChange(index, 'result', e.target.value)}
                                />
                            </div>
                        ))}
                    <button type="button" onClick={handleSubmit}>
                        Submit
                    </button>
                    </div>
                )}
            </form>
        </div>
    );
}
