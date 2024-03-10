"use client"

import { useEffect, useState } from 'react';
import { IQuiz } from '@/lib/models/quiz.model'; // Import the interface for the quiz
import { IQuizMetadata } from '@/lib/models/quiz_metadata.model';
import { getCategories } from '@/data/controller';
import { ICategory } from '@/data/categories/categories';
import { CreateQuizCollection, CreateQuizMetadata } from '@/lib/actions/quiz.actions';
import { useUser } from '@clerk/nextjs';
import { GetUserByClerkID } from '@/lib/actions/user/user.actions';
import { IUser } from '@/lib/models/user/user.model';
import Link from 'next/link';
import MainContent from '@/components/shared/MainContent';


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
            { from: 0, to: 2, result: '' },
            { from: 3, to: 5, result: '' },
            { from: 6, to: 6, result: '' }
        ]
    } as IQuiz;

    const initialQuizMetadataState:IQuizMetadata = {
        id: '',
        name: 'Quiz name',
        title: 'Quiz title',
        category: 'Quiz category',
        createdBy: 'CreatedBy Id',
        timesClicked: 0,
        timesFinished: 0,
        active: 0
    } as IQuizMetadata


    

    const [quiz, setQuiz] = useState(initialQuizState);
    const [quizMetadata, setQuizMetadata] = useState(initialQuizMetadataState);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const [quizMetadataVisibility, setQuizMetadataVisibility] = useState(true)
    const [questionsVisibility, setquestionsVisibility] = useState(false)
    const [resultsVisibility, setResultsVisibility] = useState(false)

    const { isLoaded, isSignedIn, user } = useUser();
    const [DbUser, setDbUser] = useState<IUser|null>(null)

    const [submitted, setSubmitted] = useState(false);
    
    const [errorSubmiting, setErrorSubmiting] = useState(false);

    const categories: ICategory[] = getCategories()


    useEffect(() => {
        const fetchUser = async () => {
            
            if (user && user.id) { // Check if user and user.id are defined
                const dbUser = await GetUserByClerkID(user.id);
                setDbUser(dbUser);
                console.log("DB-user: ", dbUser)
            }
        }
        fetchUser()
    },[user])

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

    const handleNameContentChange = (value:string) => {
       
        setQuizMetadata((prevState: IQuizMetadata) => {
            const currentQuizMetadataState = prevState;
            currentQuizMetadataState.name = value;
            
            return currentQuizMetadataState;
    });
    };

    const handleTitleContentChange = (value:string) => {
        setQuizMetadata((prevState: IQuizMetadata) => {
            const currentQuizMetadataState = prevState;
            currentQuizMetadataState.title = value;
            
            return currentQuizMetadataState;
    });
    };

    const handleCategoryChange = (value: string) => {
        console.log(value)
        console.log(quizMetadata)
        setQuizMetadata((prevState: IQuizMetadata) => {
            const currentQuizMetadataState = prevState;
            currentQuizMetadataState.category = value;
             
            return currentQuizMetadataState;
        });
        console.log(quizMetadata)
    };
    const handleChangeQuizMetadataVisibility = () => {
        
        setQuizMetadataVisibility(prevState => !prevState )
        setquestionsVisibility(prevState => !prevState)
    
    }
    const handleResultVisibility = () => {
        setResultsVisibility(prevState => !prevState)
        setquestionsVisibility(prevState => !prevState)
    }
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent the default form submission
        quiz.active = 0;        // Setting quiz to not-active - pending status 0

        // create Quiz

        try {
        
           const newQuiz = await CreateQuizCollection(quiz)
           //const newQuiz = await CreateQuizCollectionTest(initialQuizStateTest)

            if(!newQuiz){
              console.log('Error creating quiz')
              setErrorSubmiting(true)
            } else {
                
                console.log('Quiz submitted:', quiz);

                // Updating quizesMetadata object
                quizMetadata.id = newQuiz._id
                quizMetadata.createdBy = DbUser ? DbUser._id : "Unknown"

                // creating the quizMetadata
                const newQuizMetadata = CreateQuizMetadata(quizMetadata)

                if(!newQuizMetadata){
                    console.log('Error creating quizMetadata')
                    setErrorSubmiting(true)
                } else {
                    console.log('Quiz metadata:', quizMetadata);

                    // Set submitted to true to trigger the info popup
                    setSubmitted(true);
               }
            }

        } catch (error) {
            console.log("Error: ",error)
            setErrorSubmiting(true)
        }
    };


    const resetConditions = () => {
        setQuiz(initialQuizState);
        setQuizMetadata(initialQuizMetadataState);
        setCurrentQuestionIndex(0);

        setQuizMetadataVisibility(true)
        setquestionsVisibility(false)
        setResultsVisibility(false)

        setSubmitted(false);
        
        setErrorSubmiting(false);
    }


    return (

    <div>    
        <div className="max-w-md mx-auto mt-8 p-10">
             <h1 className="text-3xl font-bold mb-4">Create Quiz</h1>
             {!submitted && (
                 <form onSubmit={handleSubmit}>

                 {/** Metadata div */}
                 {quizMetadataVisibility && ( <div>
                     <div className="mb-8">
                         <h3 className="text-lg font-semibold mb-2">Question metadata</h3>
                    <div className="mb-2">
                         <input
                            type="text"
                            placeholder="Quiz name"
                            onChange={e => handleNameContentChange(e.target.value)}
                            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                         />
                    </div>
                    <div className="mb-2">
                         <input
                            type="text"
                            placeholder="Quiz short-description"
                            onChange={e => handleTitleContentChange(e.target.value)}
                            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                         />
                    </div>
                    <div className="mb-2">
                                <select
                                    value={quizMetadata.category}
                                    onChange={(e) => handleCategoryChange(e.target.value)}
                                    className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                >
                                    <option value="">Select category</option>
                                    {categories.map((category) => (
                                        <option key={category.link} value={category.link}>
                                            {category.label}
                                        </option>
                                    ))}
                                </select>
                    </div>
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                        onClick={handleChangeQuizMetadataVisibility}
                    >
                        Next Section 
                    </button>
                </div>
            </div>)}
            {/** Questions div */}
            {questionsVisibility && (
            <div>    
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
                <div className="flex flex-row justify-between mb-4 pr-10 pl-10">
                    {currentQuestionIndex == 0 && (
                        <button
                            type="button"
                            onClick={handleChangeQuizMetadataVisibility}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                        >
                            {"<"} Metadata
                        </button>
                    )}
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
                    {currentQuestionIndex == 5 && (
                        <button
                            type="button"
                            onClick={handleResultVisibility}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                        >
                            Results {">"} 
                        </button>
                    )}
                </div>
            </div>)}
            {/** Results div */}
            {resultsVisibility && ( 
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
                    <div className='flex gap-4 mt-5'>   
                        <button
                            type="button"
                            onClick={handleResultVisibility}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                        >{"<"} Questions</button>
                        <button
                            type="submit"
                            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                        >
                            Submit
                        </button>
                    </div> 
                </div>)}
            </form>
            
        )}
        {!submitted && (
                <MainContent/>
            )}
        {submitted && (
            <div className="z-11 fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-gray-700 bg-opacity-80">
                <div className="flex flex-col items-center bg-zinc-800 p-8 gap-10 rounded-md shadow-md">
                    <p className="text-lg text-green-500 font-semibold mb-2">Quiz submitted successfully!</p>
                    <Link href={'/user'} className="text-red-500 hover:text-blue-500 underline">Close</Link>
                </div>
            </div>
        )}
        {submitted && (
                <MainContent/>
            )}

        {errorSubmiting && (
            <div className="z-11 fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-gray-700 bg-opacity-80">
                <div className="bg-zinc-800 text-red-500 p-8 rounded-md shadow-md flex flex-col inline-center justify-center">
                    <p className="text-lg font-semibold mb-2 text-red-500">Quiz not submited.Error ocured</p>
                    <div className='flex flex-row gap-16 justify-center p-5'>
                        <button onClick={resetConditions} className="text-green-500 hover:text-blue-500 underline">Try again</button>
                        <Link href={'/user'} className="text-red-500 hover:text-blue-500">Close</Link>
                    </div>
                    
                </div>
            </div>
        )}
        {errorSubmiting && (
            <MainContent/>
        )}
        </div>
    </div>
    );
}
