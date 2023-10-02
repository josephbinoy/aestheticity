"use client"
import { useState,useEffect } from "react"
import { Carousel } from 'flowbite-react';
import { HeartIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import toast, {Toaster} from "react-hot-toast";

export default function Page(){
  const [redHearts, setRedHearts]=useState([]);
  const [galleryArray,setGalleryArray]=useState([]);

  async function favoriteImage(id,i){
    let favoriteArray=redHearts.map((item,index)=>(i==index)?true:item)
    setRedHearts(favoriteArray);
    try{
      const response=await axios.post("/api/images/favorite",{imageID:id});
      toast.success(response.data.message);
    }
    catch(error){
      toast.error(error.response.data.error);
    }
  }

  useEffect(()=>{
      async function getHomepageImages(){
      const response=await axios.get("/api/images/getimages");
      setGalleryArray(response.data.images);
      let heartArray=[];
      for(var i=0;i<response.data.images.length;i++){
        heartArray.push(false)
      }
      setRedHearts(heartArray);
    }
    getHomepageImages();
  },[])
  return (
    <>
      <div className="relative h-[60vh]">
      <Carousel className="rounded-[0px]">
        <img src='/1610350906331.jpg'  className="h-[60vh] w-full object-cover" />
        <img src='/1612277696327.jpg'  className="h-[60vh] w-full object-cover"/>
        <img src='/1624317006456.jpg'  className="h-[60vh] w-full object-cover"/>
        <img src='/1625609225629.jpg'  className="h-[60vh] w-full object-cover"/>
        <img src='/sv9jpowlw8o71.jpg'  className="h-[60vh] w-full object-cover"/>
      </Carousel>
      <div className="absolute top-0 right-0 bg-gradient-to-l from-black to-transparent h-full w-full text-white text-[64px] flex flex-col justify-center items-end">
          <h1 className="inline-block mx-20 text-gray-300">find your aesthetic today.</h1>
          <h1 className="inline-block mx-20 text-gray-300">from you. for you.</h1>
      </div>
      </div>
      <h1 className="text-4xl font-bold m-20">We keep the images unaltered.</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 w-full gap-10 my-20 px-20 ">
          {galleryArray.map((image,index)=>{
            
            return <div key={image._id} className="relative w-11/12 shadow-lg hover:scale-110 transition-all hover:shadow-2xl bg-gradient-to-l from-black to-transparent z-10">
            <img src={`${image.image.contentType},${Buffer.from(image.image.data.data,ArrayBuffer).toString('base64')}`}
              className="h-full w-full object-cover rounded" />
            <div className="opacity-50 absolute inset-0 bg-gradient-to-b from-black to-transparent"></div>
            <div className="absolute inset-5 flex justify-center items-center h-fit w-fit " >
              <button onClick={()=>{favoriteImage(image._id,index)}}>
                <HeartIcon className={`w-8 h-8 stroke-white ${redHearts[index]&&"fill-red-600"} hover:fill-red-600 hover:stroke-white hover:scale-105 active:fill-red-600`}/>
              </button>
              <p className="text-white h-fit mx-3">23,092</p>
            </div>
            </div>
          }
          )}
      </div>
      <Toaster />
    </>
  )
  }
//${redHearts[index]&&"fill-red-600"}
  //1. store as arraybuffer and decode to base64 only when retrieving
  //2. store images in another database and store only urls in mongosdb -best method