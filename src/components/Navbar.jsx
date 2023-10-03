"use client"

import { Fragment, useEffect, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import axios from 'axios'
import { useRouter,usePathname } from 'next/navigation'
import Link from 'next/link'

export default function Navbar() {
  const path=usePathname();
  const [isLoggedIn, setIsLoggedIn]=useState(false);
  const router=useRouter();
  const [currentPage, setCurrentPage]=useState();
  async function logOutUser(){
    try {
        await axios.get("/api/users/logout")
        router.push("/login");
    } catch (error) {
        console.log(error);
    }
}
const navigation = [
  { name: 'Home', href: '/', current: currentPage==="/"?true:false},
  { name: 'Gallery', href: '#', current: currentPage==="/gallery"?true:false },
  { name: 'Collections', href: '#', current: currentPage==="/collections"?true:false },
]
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

useEffect(()=>{
  async function verifySession(){
    try{
      setCurrentPage(path);
      const response=await axios.get("/api/users/getuser");
      if(response.data)
        setIsLoggedIn(true);
   }
   catch(error){
    await axios.get("/api/users/logout")
    console.log(error);

   }
  }
  verifySession();
},[])

return (
  <Disclosure as="nav" className="bg-gray-950">
    {({ open }) => (
      <>
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-20 items-center justify-between">

            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {/* Mobile menu button*/}
              <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                <span className="absolute -inset-0.5" />
                {open ? (
                  <XMarkIcon className="block h-6 w-6" />
                ) : (
                  <Bars3Icon className="block h-6 w-6" />
                )}
              </Disclosure.Button>
            </div> {/* hamburger menu icon */}

            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">

              <div className="flex flex-shrink-0 items-center">
                <img
                  className="h-16 w-auto"
                  src="./aesth_icon-removebg-preview.png"
                  alt="Your Company"
                />
              </div> {/* icon div*/}

              <div className="hidden sm:ml-6 sm:block my-auto">
                <div className="flex space-x-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'rounded-md px-3 py-2 text-lg font-medium'
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div> {/* nav links */}

            </div>

            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

              {/* Profile dropdown */}
              {isLoggedIn?
              <Menu as="div" className="relative ml-3">
                <div>
                  <Menu.Button className="relative flex ring-1 ring-white bg-gray-800 focus:outline-none focus:ring-2 focus:ring-white">
                    <span className="absolute -inset-1.5" />
                    <img
                      className="h-10 w-10 rounded-full"
                      src="/28-284109_m (3).png"
                      alt=""
                    />
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-gray-900 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href="/profile"
                          className={classNames(active ? 'bg-gray-700' : '', 'block px-4 py-2 text-sm text-gray-300 cursor-pointer')}
                        >
                          Your Profile
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(active ? 'bg-gray-700' : '', 'block px-4 py-2 text-sm text-gray-300 cursor-pointer')}
                        >
                          Settings
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <p onClick={logOutUser}
                          className={classNames(active ? 'bg-gray-700' : '', 'block px-4 py-2 text-sm text-gray-300 cursor-pointer')}
                        >
                          Log out
                        </p>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>:<button className='text-white'><Link href="/login">Log in</Link></button>}

            </div>
          </div>
        </div>

        <Disclosure.Panel className="sm:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {navigation.map((item) => (
              <Disclosure.Button
                key={item.name}
                as="a"
                href={item.href}
                className={classNames(
                  item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                  'block rounded-md px-3 py-2 text-base font-medium'
                )}
              >
                {item.name}
              </Disclosure.Button>
            ))}
          </div>
        </Disclosure.Panel>
      </>
    )}
  </Disclosure>
)
}
