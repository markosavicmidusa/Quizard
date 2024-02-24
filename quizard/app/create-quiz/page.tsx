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

    const handleQuestionChange = (field: string, value: any, answerIndex: number) => {
        setQuiz((prevState: IQuiz) => {
            const newQuestions = [...prevState.questions];
            newQuestions[currentQuestionIndex].answers[answerIndex] = {
                ...newQuestions[currentQuestionIndex].answers[answerIndex],
                [field]: value
            };
            const question : IQuiz = {
                ...prevState,
                questions: newQuestions
            } as IQuiz

            return question
        });
    };

    const handleQuestionContentChange = (value: any) => {
        setQuiz((prevState: IQuiz) => {
            const newQuestions = [...prevState.questions];
            newQuestions[currentQuestionIndex].question = value;
            const question : IQuiz = {
                ...prevState,
                questions: newQuestions
            } as IQuiz

            return question
        });
    };
    

    const handleResultChange = (index: number, field: string, value: any) => {
        setQuiz((prevState: IQuiz) => {
            const newResults = [...prevState.results];
            newResults[index] = { ...newResults[index], [field]: value };
            
            const result = {
                ...prevState, 
                results: newResults 
            } as IQuiz
            
            return result;
        });
    };
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent the default form submission
        console.log('Quiz submitted:', quiz);
    };

    return (
        <div className="max-w-md mx-auto mt-8">
    <h1 className="text-3xl font-bold mb-4">Create Quiz</h1>
    <form onSubmit={handleSubmit}>
        <div key={currentQuestionIndex} className="mb-8">
            <h3 className="text-lg font-semibold mb-2">Question {currentQuestionIndex + 1}</h3>
            <div className="mb-2">
                <input
                    type="text"
                    placeholder={`Question ${currentQuestionIndex + 1} content`}
                    value={quiz.questions[currentQuestionIndex].question}
                    onChange={e => handleQuestionContentChange(e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                />
            </div>
            {quiz.questions[currentQuestionIndex].answers.map((answer, answerIndex) => (
                <div key={answerIndex} className="mb-2">
                    <input
                        type="text"
                        placeholder={`Answer ${answerIndex + 1} ${answerIndex === 0 ? ' (true question)':''}`}
                        value={answer.value}
                        onChange={e => handleQuestionChange('value', e.target.value, answerIndex)}
                        className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                    />
                </div>
            ))}
        </div>
        <div className="flex justify-between mb-4">
            {currentQuestionIndex > 0 && (
                <button
                    type="button"
                    onClick={handlePrevQuestion}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                    {"<"} Previous
                </button>
            )}
            {currentQuestionIndex < quiz.questions.length - 1 && (
                <button
                    type="button"
                    onClick={handleNextQuestion}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                    Next {">"}
                </button>
            )}
        </div>
        {currentQuestionIndex === quiz.questions.length - 1 && (
            <div>
                <h2 className="text-lg font-semibold mb-2">Results</h2>
                {quiz.results.map((result, index) => (
                    <div key={index} className="mb-2">
                        <input
                            type="text"
                            placeholder={`Result ${index + 1}`}
                            value={result.result}
                            onChange={e => handleResultChange(index, 'result', e.target.value)}
                            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                        />
                    </div>
                ))}
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                    Submit
                </button>
            </div>
        )}
    </form>
</div>

    );
}
