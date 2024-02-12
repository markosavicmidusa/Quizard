import { IQuizMetadata } from "@/lib/models/quiz_metadata.model"
import Image from "next/image"
import Link from "next/link"


export default function Quiz({quiz}:{quiz:IQuizMetadata}){

    return (
        <Link href={`/quizes/${quiz.id}`}>
            <div className="z-10 w-48 border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300 cursor-pointer">
                 <div className="relative h-36">
                   <Image
                     src="/quizes/quiz-pic.png"
                     alt={quiz.name}
                     layout="fill"
                     objectFit="cover"
                   />
                 </div>
                 <div className="p-2">
                   <h2 className="text-lg font-bold">{quiz.name.substring(0,15)}</h2>
                   <p className="text-sm text-gray-700">{quiz.title.substring(0,19)}...</p>
                 </div>
               </div>
        </Link>

        )
}