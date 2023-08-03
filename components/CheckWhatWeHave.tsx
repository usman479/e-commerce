'use client'
import React from 'react'
import { Carousel } from '@trendyol-js/react-carousel'
import { ScrollingCarousel } from '@trendyol-js/react-carousel/'
import WrapperMaxWidth from './WrapperMaxWidth'
import Image from 'next/image'
import prod1 from '@/public/prod1.png'
import prod2 from '@/public/prod2.png'
import prod3 from '@/public/prod3.png'
import prod4 from '@/public/prod4.png'
import prod5 from '@/public/prod5.png'
import prod6 from '@/public/prod6.png'

const products = [{
    img: prod1,
    name: 'Raglan Shirt',
    price: '$200'
}, {
    img: prod2,
    name: 'Raglan Shirt',
    price: '$200'
}, {
    img: prod3,
    name: 'Raglan Shirt',
    price: '$200'
}, {
    img: prod4,
    name: 'Raglan Shirt',
    price: '$200'
}, {
    img: prod5,
    name: 'Raglan Shirt',
    price: '$200'
}, {
    img: prod6,
    name: 'Raglan Shirt',
    price: '$200'
}];

export default function CheckWhatWeHave() {
    return (
        <WrapperMaxWidth>
            <section className='w-full space-y-4 mt-36'>
                <h3 className='uppercase text-center text-blue-600 text-sm font-bold'>Products</h3>
                <p className='text-center text-4xl font-bold capitalize'>check what we have</p>
                <Carousel show={2.3} slide={2} swiping={true} useArrowKeys={true} swipeOn={0.3}>
                    {products.map(prod => (
                        <div className='flex flex-col justify-center mx-4'>
                            <Image src={prod.img} alt='product' className='w-[380px] h-[400px]' />
                            <p className='text-lg font-bold'>{prod.name}</p>
                            <p className='text-lg font-bold'>{prod.price}</p>
                        </div>
                    ))}
                </Carousel>
            </section>
        </WrapperMaxWidth>
    )
}
