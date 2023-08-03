import React from 'react'
import WrapperMaxWidth from './WrapperMaxWidth'
import Image from 'next/image'
import logo from '@/public/logo.webp'
import { Twitter, Facebook, Linkedin } from 'lucide-react'

export default function Footer() {
    return (
        <WrapperMaxWidth>

            <footer className='mt-36'>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 justify-center lg:justify-items-center gap-4 text-gray-700 mb-8'>
                    <div className='flex flex-col gap-y-4 '>
                        <Image src={logo} alt='dine market' />
                        <p>Small, artisan label that offers a thoughtfully curated collection of high quality everyday essentials made.</p>
                        <div className='flex gap-x-4'>
                            <div className='bg-gray-200 rounded-md p-2 cursor-pointer group'>
                                <Twitter className='group-hover:scale-110 duration-200 group-hover:text-blue-600' />
                            </div>
                            <div className='bg-gray-200 rounded-md p-2 cursor-pointer group'>
                                <Facebook className='group-hover:scale-110 duration-200 group-hover:text-blue-600'/>
                            </div>
                            <div className='bg-gray-200 rounded-md p-2 cursor-pointer group'>
                                <Linkedin className='group-hover:scale-110 duration-200 group-hover:text-blue-800'/>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col gap-y-4 sm:place-self-center lg:place-self-auto'>
                        <h3 className='font-semibold text-xl'>Company</h3>
                        <p>About</p>
                        <p>Terms of Use</p>
                        <p>Privacy Policy</p>
                        <p>How it Works</p>
                        <p>Contact Us</p>
                    </div>
                    <div className='flex flex-col gap-y-4'>
                        <h3 className='font-semibold text-xl'>Support</h3>
                        <p>Support Carrer</p>
                        <p>24h Service</p>
                        <p>Quick Chat</p>
                    </div>
                    <div className='flex flex-col gap-y-4 sm:place-self-center sm:self-start  lg:place-self-auto'>
                        <h3 className='font-semibold text-xl'>Contact</h3>
                        <p>Whatsapp</p>
                        <p>Support 24h</p>
                    </div>

                </div>

                <hr className='border border-black' />
                <div className='flex justify-between my-8'>
                    <p>Copyright © 2022 Dine Market</p>
                    <p>Design by. <span className='font-bold' >Weird Design Studio</span></p>
                    <a href='https://github.com/usman479' target='_blank'> <p>Code by. <span className='font-bold'>usman479 on github</span></p></a>
                </div>
            </footer>
        </WrapperMaxWidth>
    )
}
