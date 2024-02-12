"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getQuizById } from '@/lib/actions/quiz.actions';
import { IQuiz } from '@/lib/models/quiz.model';

export default function ActiveQuiz({ params }: { params: { id: string } }) {
   // const router = useRouter();
    const [quiz, setQuiz] = useState<IQuiz | null>(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState<string[]>([]);
    const [result, setResult] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                console.log("heloooo")
            } catch (error) {
                console.error('Error fetching quizzes:', error);
            }
        };

        fetchQuizzes();
    }, []);


 /*   const handleAnswerSelect = (selectedAnswer: string) => {
        setUserAnswers(prevAnswers => [...prevAnswers, selectedAnswer]);
        if (currentQuestionIndex < (quiz?.questions.length ?? 0) - 1) {
            setCurrentQuestionIndex(prevIndex => prevIndex + 1);
        } else {
            // Calculate result
            let score = 0;
            userAnswers.forEach((answer, index) => {
                const correctAnswer = quiz?.questions[index].answers.find(a => a.isCorrect);
                if (correctAnswer && answer === correctAnswer.value) {
                    score++;
                }
            });
            const percentage = (score / (quiz?.questions.length ?? 1)) * 100;
            // Display result
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

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!quiz) {
        return <p>No quiz found.</p>;
    }
*/
    return (
    <div>
        {params.id}
    </div>       
    );
}
