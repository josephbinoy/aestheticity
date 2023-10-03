"use client"

import { Suspense, lazy} from 'react';
import { Carousel } from 'flowbite-react';
import MyFooter from "@/components/Footer";
// import Gallery from '@/components/Gallery';
const Gallery = lazy(() => import('@/components/Gallery'))

export default function Page(){

  return (
    <>
      <div className="relative h-[60vh]">
      <Carousel leftControl="left"
      rightControl="right" indicators={false}>
        <img src='/1610350906331.jpg'  className="h-[60vh] w-full object-cover" />
        <img src='/1612277696327.jpg'  className="h-[60vh] w-full object-cover"/>
        <img src='/1624317006456.jpg'  className="h-[60vh] w-full object-cover"/>
        <img src='/1625609225629.jpg'  className="h-[60vh] w-full object-cover"/>
        <img src='/sv9jpowlw8o71.jpg'  className="h-[60vh] w-full object-cover"/>
      </Carousel>
      <div className="opacity-75 absolute top-0 right-0 bg-gradient-to-l from-black to-transparent h-full w-full text-white text-[64px] flex flex-col justify-center items-end">
          <h1 className="inline-block mx-20 text-gray-300">find your aesthetic today.</h1>
          <h1 className="inline-block mx-20 text-gray-300">from you. for you.</h1>
      </div>
      </div>
      <Suspense fallback={<div className='h-screen w-[900px] bg-red-300'>Loading now!!!!!!!!</div>}>
      <Gallery />
      </Suspense>
      <MyFooter />
    </>
  )
}
  //1. store as arraybuffer and decode to base64 only when retrieving
  //2. store images in another database and store only urls in mongosdb -best method
  //3. useContext to save logged in status and user details from navbar get
  //4. Lazy loading, load 8 images on scroll instead of all 50+ at once
  //5. replace all img with next Image component
  //6. Verification page, forgot password page
  //7. Navbar fails get when not logged in....see point 3
  //8. Loading UI. Read docs
  //9. page not found ui
  //10. need to protect some more routes.
  //11. enlarge to full size on click image in home
  //12. Unfavorite image on second click

  //13. sometimes next Link not working...check
  //14. Accounts page ->add pfp, change password, email etc. see all details.
  //15. style the verify and forgot emails
  //16. revalidation and server actions??