"use client"

import { useState,useEffect} from "react"
import { HeartIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import toast, {Toaster} from "react-hot-toast";
import { Modal } from 'flowbite-react';
import GallerySkeleton from "./GallerySkeleton";

export default function Gallery(){
    const [modalImgUrl,setModalImgUrl]=useState("");
    const [redHearts, setRedHearts]=useState([]);
    const [galleryArray,setGalleryArray]=useState([]);
    const [openModal, setOpenModal] = useState();
    const props = { openModal, setOpenModal };
    const [isLoading, setisLoading]=useState(true);
  
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
        setisLoading(false);
      }
      getHomepageImages();
    },[])

    return(
        <>
            {isLoading?<GallerySkeleton/>:
            <div className="flex flex-col justify-center items-center min-w-full p-8 pt-16 pl-16 space-y-16">
            <h1 className="text-[50px] text-gray-600">Handpicked images for you. Find your aesthetic now.</h1>
            <div className="grid mb-10 gap-10 gap-x-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 min-[1900px]:grid-cols-4 w-full">
            {galleryArray.map((image,index)=>{
            const galleryUrl=`${image.imageFormat},${Buffer.from(image.data,ArrayBuffer).toString('base64')}`;
            return <div key={image._id} 
            className="relative md:w-11/12 shadow-lg hover:scale-110 transition-all hover:shadow-2xl">
            <img  onClick={()=> { 
              props.setOpenModal('dismissible');
              setModalImgUrl(galleryUrl);
              }}
                src={galleryUrl}
              className="h-full w-full object-cover rounded" />
                <div className="opacity-50 h-1/4 absolute inset-0 bg-gradient-to-b from-black to-transparent"></div>
                <div className="absolute inset-5 flex justify-center items-center h-fit w-fit " >
              <button onClick={()=>{favoriteImage(image._id,index)}}>
                <HeartIcon className={`w-8 h-8 stroke-white ${redHearts[index]&&"fill-red-600"} hover:fill-red-600 hover:stroke-white hover:scale-105 active:fill-red-600`}/>
              </button>
              <p className="text-white h-fit mx-3">{Math.floor(Math.random()*1000)}</p>
            </div>
            <p>Uploaded by {image.uploader}</p>
            </div>
            }
            )}
            </div>
            <Modal dismissible show={props.openModal === 'dismissible'} onClose={() => props.setOpenModal(undefined)} size="7xl">
                <Modal.Body className="p-0" style={{scrollbarWidth:0}}>
                    <img src={modalImgUrl} className="h-full w-full"></img>
                </Modal.Body>
            </Modal>
            <Toaster />
            </div>
            }
      </>
    )
}