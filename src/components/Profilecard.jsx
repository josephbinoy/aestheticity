import { Card } from 'flowbite-react';
import { ArrowUpRightIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import toast, {Toaster} from "react-hot-toast"

export default function ProfileCard({username, email, isVerified, userID}) {
  return (
    <Card className='rounded-md'>
      <div className="flex flex-col items-center py-3">
        <img
          alt="Bonnie image"
          className="mb-3 rounded-full shadow-lg"
          height="96"
          src="/28-284109_m (3).png"
          width="96"
        />
        <h5 className="mb-1 text-2xl text-gray-900 dark:text-white">
          {username}
        </h5>
        <span className="mb-3 text-sm text-gray-400 dark:text-gray-400">
          {email}
        </span>
        {isVerified?
        <span className="text-sm text-green-400 dark:text-gray-400">
          Verified
        </span>:
        <span className="text-sm text-red-500 dark:text-gray-400">
          Not Verified
        </span>}
        <div className="mt-4 flex space-x-3 lg:mt-6">
          <a
            className="inline-flex items-center rounded-lg bg-gray-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
            href="#"
          >
            <p className='flex gap-2 justify-center items-center'>
                Account settings<ArrowUpRightIcon className='h-4 w-4'/>
            </p>
          </a>
          {!isVerified&&<a onClick={async ()=>{await axios.post("/api/users/sendverify",{
            email:email, userID:userID})
            toast.success("Verification email sent")}} 
            className="inline-flex items-center rounded-lg border border-green-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
            href="#">
            <p className='text-green-500'>
              Verify
            </p>
          </a>}

        </div>
      </div>
    </Card>
  )
}


