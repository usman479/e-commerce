'use client'
import React, { useEffect, useState } from 'react'
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
// let showCards: number = 1;
// let slide: number = 1;

export default function CheckWhatWeHave() {
    // let width: number = 0;
    // const [width, setWidth] = useState(0);

    // useEffect(() => {
    //     console.log(screen.width)
    //     if (window.screen.width < 421) {
    //         showCards = 1
    //         slide = 1;
    //     } else if (window.screen.width < 641) {
    //         showCards = 1.5
    //         slide = 1;
    //     } else if (window.screen.width < 769) {
    //         showCards = 2
    //         slide = 2
    //     } else if (window.screen.width < 1025) {
    //         showCards = 3
    //         slide = 3
    //     } else if (window.screen.width < 1300) {
    //         showCards = 3
    //         slide = 3
    //     } else {
    //         showCards = 4
    //         slide = 4
    //     }
    //     console.log(showCards)
    //     setWidth(prev => 5);
    // }, [])



    // console.log(showCards, width)
    // if (width) {
        // console.log(showCards, width)
        return (
            <WrapperMaxWidth>
                <section className='w-full space-y-4 mt-24'>
                    <h3 className='uppercase text-center text-blue-600 text-sm font-bold'>Products</h3>
                    <p className='text-center text-4xl font-bold capitalize'>check what we have</p>
                    <Carousel show={2.5} slide={2} swiping={true} useArrowKeys={true} swipeOn={0.3}>
                        {products.map((prod, index) => (
                            <div className='flex flex-col justify-center mx-4' key={index}>
                                <Image src={prod.img} alt='product' className='w-[190px] h-[200px] md:w-[380px] md:h-[400px] ' />
                                <p className='text-lg font-bold'>{prod.name}</p>
                                <p className='text-lg font-bold'>{prod.price}</p>
                            </div>
                        ))}
                    </Carousel>
                    <div className='flex justify-center'>
                        <p className='text-center  text-xl border-b-2 border-gray-400 inline-block tracking-widest animate-pulse'>SWIPE TO EXPLORE</p>
                    </div>
                </section>
            </WrapperMaxWidth>
        )
    // }
}
