export default function ProfileSkeleton(){
return(
        <div className="flex-1 grid 2xl:grid-cols-2 gap-10 my-20 px-20 ">
                <div className="animate-pulse w-11/12 h-[300px] bg-gray-300"></div>
                <div className="animate-pulse w-11/12 h-[300px] bg-gray-300"></div>
                <div className="animate-pulse w-11/12 h-[300px] bg-gray-300"></div>
                <div className="animate-pulse w-11/12 h-[300px] bg-gray-300"></div>
        </div>
    )
}