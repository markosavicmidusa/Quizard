"use client"

import { useEffect, useState } from 'react';
import { getMostPopular50Quizzes } from '@/lib/actions/quiz.actions';
import { IQuizMetadata } from '@/lib/models/quiz_metadata.model';

export default function MostPopularQuizes() {
    const [quizzes, setQuizzes] = useState<IQuizMetadata[]>([]);

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const fetchedQuizzes: IQuizMetadata[]= await getMostPopular50Quizzes();
                setQuizzes(fetchedQuizzes);
            } catch (error) {
                console.error('Error fetching quizzes:', error);
            }
        };

        fetchQuizzes();
    }, []);

    return (
        <div className="overflow-auto max-h-64 w-full">
        <ul className="list-none p-0 flex flex-wrap">
            {quizzes.map((quiz) => (
                <li key={quiz.id} className="border 1px white w-auto p-10">
                    <p className="font-semibold">Name: {quiz.name}</p>
                    <p className="font-semibold">Title: {quiz.title}</p>
                    <p className="font-semibold">Category: {quiz.category}</p>
                    <p className="font-semibold">Created By: {quiz.createdBy}</p>
                    <p className="font-semibold">Times Clicked: {quiz.timesClicked}</p>
                    <p className="font-semibold">Times Finished: {quiz.timesFinished}</p>
                </li>
            ))}
        </ul>
    </div>
    );
}
