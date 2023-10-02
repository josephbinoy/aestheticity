"use client"

import axios from "axios"
import Link from "next/link"
import ProfileCard from "@/components/Profilecard";
import { useRouter } from "next/navigation";
import { useState} from "react";
import toast, { Toaster } from 'react-hot-toast';
import Dropzone from 'react-dropzone'
import { PhotoIcon,HeartIcon,ArrowUpOnSquareIcon } from "@heroicons/react/24/outline";

export default function Page(){
    const favoritesArray=['/gallery/51771262_p0.jpg','/gallery/1610350906331.jpg','/gallery/1612277696327.jpg','/gallery/d6qcb6hgt1091.jpg'];
    const uploadsArray=['/gallery/d6qcb6hgt1091.jpg','/gallery/bis-biswas-dreamy-night.jpg','/gallery/1624317006456.jpg','/gallery/Ff0tM52UYAAHl6I.jpg'];
    const router=useRouter();
    const [showFavorites, setShowFavorites]=useState(false);
    const [showUploads, setShowUploads]=useState(false);
    const [showProfile, setShowProfile]=useState(true);
    // const [galleryArray, setGalleryArray]=useState([]);

    async function logOutUser(){
        try {
            await axios.get("/api/users/logout")
            router.push("/login");
        } catch (error) {
            toast.error(error.response.data.error);
        }
    }

    function renderFavorites(){
        console.log("render favorites was called")
        setShowProfile(false);
        setShowUploads(false);
        setShowFavorites(true);
    }

    function renderUploads(){
        console.log("render uploads was called")
        setShowProfile(false);
        setShowFavorites(false);
        setShowUploads(true);
    }

    function renderProfile(){
        console.log("render profile was called")
        setShowFavorites(false);
        setShowUploads(false);
        setShowProfile(true);
    }
    // async function getUserDetails(){
    //     try {
    //         const response =await axios.get("/api/users/getuser")
    //         console.log(response);
    //         if(response.data.success)
    //             setDisplayDetails(response.data.data.email+" "+response.data.data.username);

    //     } catch (error) {
    //         console.log(error)
    //         toast.error("Could not get user details");
    //     }
    // }

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
        <div className="flex h-screen w-full">
            <div className="w-[400px] bg-gray-50">
                <ul className="m-10">
                    <li onClick={renderProfile}><ProfileCard /></li>
                    <li onClick={renderFavorites} className="cursor-pointer flex items-center gap-2 h-12 my-10 w-full text-3xl text-gray-500"><HeartIcon className="w-8 h-8 inline"/> Your favorites</li>
                    <li onClick={renderUploads} className="cursor-pointer flex items-center gap-2 h-12 w-full text-3xl text-gray-500"><PhotoIcon className="w-8 h-8"/>Your uploads</li>
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
                    <Toaster />
            </div>}
            {showUploads&&<div className="flex-1 grid 2xl:grid-cols-2 gap-10 my-20 px-20 ">
                {favoritesArray.map((image,index)=><div key={index} className="w-11/12">
                        <img src={image} className="h-full w-full object-contain rounded" />
                    </div>)}
            </div>}
            {showFavorites&&<div className="flex-1 grid 2xl:grid-cols-2 gap-10 my-20 px-20 ">
                {uploadsArray.map((image,index)=><div key={index} className="w-11/12">
                        <img src={image} className="h-full w-full object-contain rounded" />
                    </div>)}
            </div>}
        </div>
        </>
    )
}
