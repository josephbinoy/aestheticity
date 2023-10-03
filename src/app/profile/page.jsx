"use client"

import axios from "axios"
import ProfileCard from "@/components/Profilecard";
import { useState,useEffect} from "react";
import toast, { Toaster } from 'react-hot-toast';
import Dropzone from 'react-dropzone'
import { PhotoIcon,HeartIcon,ArrowUpOnSquareIcon } from "@heroicons/react/24/outline";
import { PhotoIcon as FilledPhoto,HeartIcon as FilledHeart} from "@heroicons/react/24/solid";
import { Button } from "flowbite-react";
import { Transition } from "@headlessui/react";
import ProfileSkeleton from "@/components/ProfileSkeleton";

export default function Page(){
    const [isLoading, setIsLoading]=useState(true);
    const [user,setUser]=useState({
        _id:"",
        username:"-",
        email:"-",
        isVerified:false
    })
    const [favoritesArray,setFavoritesArray]=useState([]);
    const [uploadsArray,setUploadsArray]=useState([]);
    const [showFavorites, setShowFavorites]=useState(false);
    const [showUploads, setShowUploads]=useState(false);
    const [showProfile, setShowProfile]=useState(true);

    async function renderFavorites(){
        console.log("render favorites was called")
        setShowProfile(false);
        setShowUploads(false);
        setShowFavorites(true);
        try{
        const response=await axios.post("/api/users/profile/favorites", {userID:user._id});
        setFavoritesArray(response.data.user.favorites);
        setIsLoading(false);
        }
        catch(error){
            toast.error(error.response.data.error);
        }
    }

    async function renderUploads(){
        console.log("render uploads was called")
        setShowProfile(false);
        setShowFavorites(false);
        setShowUploads(true);
        try{
        const response=await axios.post("/api/users/profile/uploads", {userID:user._id});
        setUploadsArray(response.data.user.uploads);
        setIsLoading(false);
        }
        catch(error){
            toast.error(error.response.data.error);
        }
    }
    
    function renderProfile(){
        console.log("render profile was called")
        setShowFavorites(false);
        setShowUploads(false);
        setShowProfile(true);
    }

    useEffect(()=>{
        async function getUser(){
            try{
                const response=await axios.get("/api/users/getuser");
                const foundUser=response.data.user;
                setUser(foundUser);
            }
            catch(error){
                toast.error(error.response.data.error)
            }
        }
        getUser();
    },[])

    function onDrop(file){
          const reader = new FileReader();    
          reader.onabort = () => console.log('file reading aborted')
          reader.onerror = () => console.log('file reading failed')
          reader.onload = async () => {
            try{
            const imageRaw = reader.result;
            const imageSplit=imageRaw.split(",");
            const imageBase64=Buffer.from(imageSplit[1], "base64");
            const response=await axios.post("/api/images/upload", {
                imageBinary: imageBase64,
                imageType: imageSplit[0]
            })
            toast.success(response.data.message);
            }
            catch(error){
                toast.error(error.response.data.error)
            }
          }
          reader.readAsDataURL(file[0]);
      }

    function sizeChecker(file){
        if(file.size>2000000){
            toast.error("File too large. File must me smaller than 2mb")
            return {
                code: "file-too-large",
                message: `File is larger than 2mb`
              };
        }
        return null;
      }

    return(
        <>
        <Toaster />
        <div className="flex h-[calc(100vh-80px)] w-full">
            <div className="relative w-[400px] bg-gray-50">
                    <Transition show={!showProfile}
                            enter="transition-opacity duration-75"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity duration-150"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                    ><Button color="light" className="rounded-md mx-10 my-5 absolute top:0 shadow right:0 focus:ring-0" onClick={renderProfile}>Back to profile</Button></Transition>
                    <ul className="m-10 mt-20">
                    <li><ProfileCard username={user.username} email={user.email} isVerified={user.isVerified} userID={user._id}/></li>
                    <li onClick={()=>{setIsLoading(true);renderFavorites()}} className={`cursor-pointer flex items-center gap-2 h-12 my-10 w-full text-2xl text-gray-500 ${showFavorites&&"text-3xl"}`}>
                    {showFavorites?<FilledHeart className="w-10 h-10 inline fill-red-600" />:<HeartIcon className="w-8 h-8 inline"/>} Your favorites</li>
                    
                    <li onClick={()=>{setIsLoading(true);renderUploads()}} className={`cursor-pointer flex items-center gap-2 h-12 my-10 w-full text-2xl text-gray-500 ${showUploads&&"text-3xl"}`}>
                    {showUploads?<FilledPhoto className="w-10 h-10 inline fill-gray-700" />:<PhotoIcon className="w-8 h-8"/>}Your uploads</li>
                </ul>
            </div>
            {showProfile&&<div className="flex-1">
                    <Dropzone onDrop={onDrop} validator={sizeChecker}>
                        {({getRootProps, getInputProps}) => (
                            <section>
                            <div {...getRootProps()} className="flex flex-col justify-center items-center m-20 h-[400px] border-dashed border-2 bg-gray-100 outline-none rounded">
                                <input {...getInputProps()} />
                                <ArrowUpOnSquareIcon className="w-16 h-16 stroke-gray-500"/>
                                <p className="text-3xl my-10">Drag 'n' drop some files here, or click to select files</p>
                            </div>
                            </section>
                        )}
                    </Dropzone>
            </div>}
            {!showProfile&&isLoading&&<ProfileSkeleton />}
            {showFavorites&&!isLoading&&<div className="flex-1 grid 2xl:grid-cols-2 gap-10 my-20 px-20 ">
                {favoritesArray.map((image)=>{
                return <div key={image._id} className="w-11/12">
                <img src={`${image.imageFormat},${Buffer.from(image.data,ArrayBuffer).toString('base64')}`}
                className="w-full object-contain rounded" />
                </div>
                })}
            </div>}
            {showUploads&&!isLoading&&<div className="flex-1 grid 2xl:grid-cols-2 gap-10 my-20 px-20 ">
                {uploadsArray.map((image)=>{
                return <div key={image._id} className="w-11/12">
                <img src={`${image.imageFormat},${Buffer.from(image.data,ArrayBuffer).toString('base64')}`}
                className="w-full object-contain rounded" />
                </div>
                })}
            </div>}
        </div>
        </>
    )
}
