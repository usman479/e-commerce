'use client'
import React, { useEffect, useState } from 'react'
import logo from '@/public/logo.webp'
import Image from 'next/image'
import Link from 'next/link'
import Badge from './Badge'
import { cn } from '@/lib/utils'
import { Transition } from '@headlessui/react'
import WrapperMaxWidth from './WrapperMaxWidth'

export default function NavBar() {

    // const [isOpen, setIsOpen] = useState(screen.width > 1023);
    const [isOpen, setIsOpen] = useState(false);
    const links = [
        { name: 'Male', route: '/male' },
        { name: 'Female', route: '/female' },
        { name: 'Kids', route: '/kids' },
        { name: 'All Products', route: '/all_products' },
    ]


    return (
        // <nav className={cn(`flex duration-200 ease-in-out flex-col justify-center space-y-6 lg:space-y-0 lg:flex-row w-full lg:justify-around items-center bg-red-100 absolute lg:static h-screen lg:h-24 z-10`,{
        //     'h-screen':isOpen,
        //     'h-24':!isOpen
        // })}>
        //     <Image src={logo} alt='logo' className='absolute top-8 left-8 lg:static' />
        //     <Link href={'/female'} className={isOpen ? 'block' : 'hidden'}>
        //         <p>Female</p>
        //     </Link>
        //     <Link href={'/male'} className={isOpen ? 'block' : 'hidden'}>
        //         <p>Male</p>
        //     </Link>
        //     <Link href={'/kids'} className={isOpen ? 'block' : 'hidden'}>
        //         <p>Kids</p>
        //     </Link>
        //     <Link href={'/products'} className={isOpen ? 'block' : 'hidden'}>
        //         <p>All Products</p>
        //     </Link>
        //     <div className='lg:flex border border-gray-400 w-60 rounded-md items-center hidden '>
        //         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-gray-600">
        //             <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
        //         </svg>
        //         <input type="text" placeholder='What are you looking for' className='px-2 text-sm' />
        //     </div>
        //     <div className={`${isOpen ? 'block' : 'hidden'} CART bg-gray-200 rounded-full w-12 h-12 flex justify-center items-center relative order-first lg:order-last`}>
        // <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        //     <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
        // </svg>
        // <Badge>{10}</Badge>
        //     </div>
        //     {!isOpen && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="HAMBURGER w-6 h-6 absolute top-3 right-8 block lg:hidden"
        //         onClick={() => setIsOpen(true)}
        //     >
        //         <path fillRule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" clipRule="evenodd" />
        //     </svg>}
        //     {isOpen &&<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="CROSS w-6 h-6 absolute top-3 right-8 block lg:hidden"
        //      onClick={() => setIsOpen(false)}
        //     >
        //         <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
        //     </svg>}

        // </nav>


        <nav className="bg-white shadow-lg fixed top-0 w-full py-2 z-50">
            <WrapperMaxWidth>
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center lg:w-full justify-between ">
                        <div className="LOGO flex-shrink-0">
                            {/* <img
                                    className="h-8 w-8"
                                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                                    alt="Workflow"
                                /> */}
                            <Image src={logo} alt='dine market' className='h-8 w-auto' />
                        </div>
                        <div className="hidden lg:block">
                            <div className="ROUTES ml-10 flex items-center space-x-4 ">
                                {links.map((link,index) => {
                                    return (<Link
                                        key={index}
                                        href={link.route}
                                        className=" hover:bg-gray-100 px-3 py-2 rounded-md text-base font-medium"
                                    >
                                        {link.name}
                                    </Link>)
                                })}
                                <div className='lg:flex border border-gray-400 w-60 rounded-md items-center hidden '>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-gray-600">
                                        <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
                                    </svg>
                                    <input type="text" placeholder='What are you looking for' className='px-2 text-sm' />
                                </div>
                                <div className=' CART bg-gray-200 rounded-full w-12 h-12 flex justify-center items-center relative'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                    </svg>
                                    <Badge>{0}</Badge>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="TOGGLE-BUTTON -mr-2 flex lg:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            type="button"
                            className="inline-flex items-center justify-center p-2 rounded-md  hover:text-gray-500  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                            aria-controls="mobile-menu"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>
                            {!isOpen ? (
                                <svg
                                    className="block h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    className="block h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </WrapperMaxWidth>

            <Transition
                show={isOpen}
                enter="transition ease-out duration-100 transform"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="transition ease-in duration-75 transform"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
            >
                {(ref) => (
                    <div className="lg:hidden" id="mobile-menu">
                        <div ref={ref} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            <Link
                                href={'/cart'}
                                className="hover:bg-gray-700  block px-3 py-2 rounded-md text-base font-medium"
                            >
                                <div className=' CART bg-gray-200 rounded-full w-12 h-12 flex justify-center items-center relative '>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                    </svg>
                                    <Badge>{0}</Badge>
                                </div>
                            </Link>
                            {links.map((link,index) => {
                                return (
                                    <Link
                                        key={index}
                                        href={link.route}
                                        className="hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium"
                                    >
                                        {link.name}
                                    </Link>
                                )
                            })}

                        </div>
                    </div>
                )}
            </Transition>
        </nav>




    )
}
