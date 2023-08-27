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
import { useDispatch } from 'react-redux'
import { getCart } from '@/redux/features/cart/cartSlice'
import { AppDispatch } from '@/redux/store'
import { client } from '@/lib/sanityClient'
import { urlForImage } from '@/sanity/lib/image'
import { Image as SanityImage } from 'sanity'
import { Skeleton } from './ui/skeleton'
import Link from 'next/link'

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

async function getProducts() {
    const res = await client.fetch(`*[_type=="product"][0...10] | order(publishedAt desc){
        image,
        title,
        price,
        _id
    }`);

    return res;
}

interface IProduct {
    image: SanityImage,
    title: string,
    price: number,
    _id:string
}

export default function CheckWhatWeHave({ searchParam }: { searchParam: string | undefined }) {
    const dispatch = useDispatch<AppDispatch>()
    const [products, setProducts] = useState<IProduct[]>();


    useEffect(() => {
        if (searchParam) {
            fetch(`${process.env.NEXT_PUBLIC_SITE_URL}api/clear-cookie?user_id=${searchParam}`)
                .then(data => {
                    dispatch(getCart());
                })
        }
        if (!products) {
            getProducts().then(data => setProducts(data))
        }
    }, [])

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
                {products &&
                    <Carousel show={2.5} slide={2} swiping={true} useArrowKeys={true} swipeOn={0.3}>
                        {products.map((prod, index) => (
                            <div className='flex flex-col justify-center mx-4' key={index}>
                               <Link href={`/product/${prod._id}`}> <Image src={urlForImage(prod.image).url()} width={300} height={400} alt='product' className='w-[190px] h-[200px] md:w-[380px] md:h-[400px] ' /></Link>
                                <p className='text-lg font-bold'>{prod.title}</p>
                                <p className='text-lg font-bold'>${prod.price}</p>
                            </div>
                        ))}
                    </Carousel>
                }
                {
                    !products && <Carousel show={2.5} slide={2} swiping={true} useArrowKeys={true} swipeOn={0.3}>

                        <div className='flex flex-col justify-center gap-y-2 mx-4'>
                            <Skeleton className='rounded-none bg-gray-200 w-[190px] h-[200px] md:w-[380px] md:h-[400px] ' />
                            <Skeleton className='rounded-none bg-gray-200 w-24 h-6' />
                            <Skeleton className='rounded-none bg-gray-200 w-16 h-6' />
                        </div>
                        <div className='flex flex-col justify-center gap-y-2 mx-4'>
                            <Skeleton className='rounded-none bg-gray-200 w-[190px] h-[200px] md:w-[380px] md:h-[400px] ' />
                            <Skeleton className='rounded-none bg-gray-200 w-24 h-6' />
                            <Skeleton className='rounded-none bg-gray-200 w-16 h-6' />
                        </div>
                        <div className='flex flex-col justify-center gap-y-2 mx-4'>
                            <Skeleton className='rounded-none bg-gray-200 w-[190px] h-[200px] md:w-[380px] md:h-[400px] ' />
                            <Skeleton className='rounded-none bg-gray-200 w-24 h-6' />
                            <Skeleton className='rounded-none bg-gray-200 w-16 h-6' />
                        </div>
                        <div className='flex flex-col justify-center gap-y-2 mx-4'>
                            <Skeleton className='rounded-none bg-gray-200 w-[190px] h-[200px] md:w-[380px] md:h-[400px] ' />
                            <Skeleton className='rounded-none bg-gray-200 w-24 h-6' />
                            <Skeleton className='rounded-none bg-gray-200 w-16 h-6' />
                        </div>
                    </Carousel>

                }
                <div className='flex justify-center'>
                    <p className='text-center  text-xl border-b-2 border-gray-400 inline-block tracking-widest animate-pulse'>SWIPE TO EXPLORE</p>
                </div>
            </section>
        </WrapperMaxWidth >
    )
}
