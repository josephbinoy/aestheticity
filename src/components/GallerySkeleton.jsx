export default function GallerySkeleton(){
  
    return(
      <>
      <div className="flex flex-col justify-center items-center min-w-full p-8 pt-16 pl-16 space-y-16">
        <h1 className="text-[40px] text-gray-600">Decompressing images...</h1>
        <div className="grid mb-10 gap-10 gap-x-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 min-[1900px]:grid-cols-4 w-full">
          <div className="animate-pulse bg-gray-300 rounded-md h-[300px] md:w-11/12 shadow-lg hover:scale-110 transition-all hover:shadow-2xl" />
          <div className="animate-pulse bg-gray-300 rounded-md h-[300px] md:w-11/12 shadow-lg hover:scale-110 transition-all hover:shadow-2xl" />
          <div className="animate-pulse bg-gray-300 rounded-md h-[300px] md:w-11/12 shadow-lg hover:scale-110 transition-all hover:shadow-2xl" />
          <div className="animate-pulse bg-gray-300 rounded-md h-[300px] md:w-11/12 shadow-lg hover:scale-110 transition-all hover:shadow-2xl" />
        </div>
      </div>
      </>
    )
}