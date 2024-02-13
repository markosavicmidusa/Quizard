"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getQuizById } from '@/lib/actions/quiz.actions';
import { IQuiz } from '@/lib/models/quiz.model';

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
            <div>
                <h2>{question.question}</h2>
                <ul>
                    {question.answers.map((answer, index) => (
                        <li key={index}>
                            <button onClick={() => handleAnswerSelect(answer.value)}>
                                {answer.value}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        );
    };

    return (
        <div>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {!loading && !error && !quiz && <p>No quiz found.</p>}
            {!loading && !error && quiz && !result && (
                <>
                    {renderQuestions()}
                </>
            )}
            {result && (
                <>
                    <p>{result}</p>
                    <button onClick={handleRetry}>Play Again</button>
                    <button onClick={handleGoToHome}>Go Home</button>
                </>
            )}
        </div>
    );
}
