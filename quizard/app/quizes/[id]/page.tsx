"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getQuizById } from '@/lib/actions/quiz.actions';
import { IQuiz } from '@/lib/models/quiz.model';
import MainContent from '@/components/shared/MainContent';

export default function ActiveQuiz({ params }: { params: { id: string }}) {
    const router = useRouter();
    const [quiz, setQuiz] = useState<IQuiz | null>(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState<string[]>([]);
    const [result, setResult] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const fetchedQuiz = await getQuizById('65cbaf90d97f1261ae3028a3');
                if (fetchedQuiz) {
                    setQuiz(fetchedQuiz);
                    setLoading(false);
                } else {
                    setError('Quiz not found.');
                    setLoading(false);
                }
            } catch (error) {
                setError('Error fetching quiz.');
                setLoading(false);
            }
        };

        fetchQuiz();
    }, [params.id]);

    const handleAnswerSelect = (selectedAnswer: string) => {
        setUserAnswers(prevAnswers => [...prevAnswers, selectedAnswer]);
        if (currentQuestionIndex < (quiz?.questions.length ?? 0) - 1) {
            setCurrentQuestionIndex(prevIndex => prevIndex + 1);
        } else {
            let score = 0;
            userAnswers.forEach((answer, index) => {
                const correctAnswer = quiz?.questions[index].answers.find(a => a.isCorrect);
                if (correctAnswer && answer === correctAnswer.value) {
                    score++;
                }
            });
            const percentage = (score / (quiz?.questions.length ?? 1)) * 100;
            setResult(`Your score: ${score}/${quiz?.questions.length} (${percentage.toFixed(2)}%)`);
        }
    };

    const handleRetry = () => {
        setUserAnswers([]);
        setCurrentQuestionIndex(0);
        setResult(null);
    };

    const handleGoToHome = () => {
        router.push('/');
    };

    const renderQuestions = () => {
        if (!quiz) return null;
        const question = quiz.questions[currentQuestionIndex];
        return (
            <div className="bg-zinc-800 text-white rounded-lg shadow-md p-6 w-full ">
                <h2 className="xl:text-2xl lg:text-2xl md:text-lg sm:text-sm font-semibold mb-4">{question.question}</h2>
                <ul>
                    {question.answers.map((answer, index) => (
                        <li key={index} className="mb-2">
                            <button 
                                className="bg-zinc-700 hover:bg-zinc-600 text-white font-bold py-2 px-4 rounded xl:text-lg lg:text-lg md:text-sm "
                                onClick={() => handleAnswerSelect(answer.value)}
                            >
                                {answer.value}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        );
    };

    return (
        <div className="flex flex-col items-center justify-center mt-10 mb-10">
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {!loading && !error && !quiz && <p>No quiz found.</p>}
            {!loading && !error && quiz && !result && (
                <>
                    {renderQuestions()}
                </>
            )}
            {result && (
                <div className='flex flex-col items-center '>
                    <div className="bg-zinc-800 rounded-lg shadow-md p-6 text-center w-full">
                        <p className="xl:text-2xl lg:text-2xl md:text-lg sm:text-sm font-semibold mb-4">{result}</p>
                        <button 
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 sm:py-3 sm:px-6 text-sm rounded mr-2 mb-2 sm:mb-0"
                            onClick={handleRetry}
                        >
                            Play Again
                        </button>
                        <button 
                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 sm:py-3 sm:px-6 text-sm rounded"
                            onClick={handleGoToHome}
                        >
                            Go Home
                        </button>
                    </div>
                    <button 
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 sm:py-3 sm:px-6 text-sm rounded mt-4"
                        onClick={() => {
                            navigator.clipboard.writeText(window.location.href);
                            alert("Quiz link copied to clipboard!");
                        }}
                    >
                        Copy Quiz Link
                    </button>

                </div>
            )}
            
            <MainContent/>
        </div>
    );
}
