import React from 'react'
import { ShoppingCart } from 'lucide-react'
import { Badge } from './ui/badge'
import TypographyH1 from './ui/TypographyH1'
import { TypographyP } from './ui/TypographyP'
import { ButtonWithIcon } from './ui/ButtonWithIcon'
import Image from 'next/image'
import bazaar from '@/public/bazaar.webp'
import bustle from '@/public/bustle.webp'
import instyle from '@/public/instyle.webp'
import versace from '@/public/versace.webp'
import heroPic from '@/public/heroPic.webp'
import WrapperMaxWidth from './WrapperMaxWidth'

export default function Hero() {
    return (
        // <div className='flex items-center justify-between'>
        <main className="flex lg:min-h-screen flex-col lg:items-center justify-between ">

            <WrapperMaxWidth>
                <div className='grid grid-cols-[1fr]  lg:grid-cols-2 items-center lg:justify-between lg:justify-items-end '>
                    <div className='space-y-4'>
                        <Badge className='rounded-md bg-blue-100 text-blue-600 text-md px-6 py-2 hover:bg-blue-100 hover:text-blue-600'>Sale 70%</Badge>
                        <TypographyH1>An Industrial Take on Streetwear</TypographyH1>
                        <TypographyP>Anyone can beat you but no one can beat your outfit as long as you wear Dine outfits.</TypographyP>
                        <ButtonWithIcon />
                        <div className='grid grid-cols-2  sm:grid-cols-4 justify-between justify-items-center gap-y-4'>
                            <Image src={bazaar} alt='logo' />
                            <Image src={bustle} alt='logo' />
                            <Image src={instyle} alt='logo' />
                            <Image src={versace} alt='logo' />
                        </div>
                        {/* <button className='flex'>
                    <ShoppingCart/>
                    Start Shopping
                </button> */}
                    </div>
                    <div className='hidden lg:block'>
                        <div className='bg-orange-200 rounded-full h-[32rem] w-[32rem] relative'>
                            <Image src={heroPic} alt='hero pic' className='absolute scale-110' />
                        </div>
                    </div>
                </div>
            </WrapperMaxWidth>
        </main>
    )
}