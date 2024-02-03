import { Commercial } from "@/data/commercials/commercials"



export default function RightSidebar({commercials}: {commercials:Commercial[]}){
    return <div >
    <div className="h-1/2 w-full p-4 border 1px white">
    <p className="border 1px white">This is the second section</p>
      
    </div>
    <div className="flex-col h-1/2 w-full p-4 border 1px white">
      <p className="border 1px white">This is the second section</p>
      
    </div>
</div>
}