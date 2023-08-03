import React from 'react'
import Image from 'next/image'
import prom1 from '@/public/prom1.webp'
import prom2 from '@/public/prom2.webp'
import prom3 from '@/public/prom3.webp'
import WrapperMaxWidth from './WrapperMaxWidth'


export default function Promotion() {
    return (
        // <WrapperMaxWidth>
        //     <section className='w-full'>
        //         <h3 className='uppercase text-center text-blue-600 text-sm font-bold'>PROMOTIONS</h3>
        //         <p className='text-center text-4xl font-bold'>Our Promotions Events</p>
        //         <div className='flex justify-between'>
        //             <div>
        //                 <div className='bg-gray-300 flex items-center'>
        //                     <div>
        //                         <p className='text-4xl font-bold'>GET UP TO 60%</p>
        //                         <p className='text-lg'>For the summer season</p>
        //                     </div>
        //                     <Image src={prom1} alt='promotion' />
        //                 </div>
        //                 <div className='bg-gray-900 text-white flex justify-center items-center flex-col'>
        //                     <p className='text-4xl font-bold'>GET 30% Off</p>
        //                     <p className='text-lg'>USE PROMO CODE</p>
        //                     <button className='text-lg font-bold tracking-widest bg-white/20 rounded-md'>DINE WEEKEND SALE</button>
        //                 </div>
        //             </div>
        //             <div className='bg-orange-300'>
        //                 <p>Flex Sweatshirt</p>
        //                 <p><span className='line-through'>$100.00</span> $75.00</p>
        //                 <Image src={prom2} alt='promotion' />
        //             </div>
        //             <div className='bg-gray-300'>
        //                 <p>Flex Push Button Bomber</p>
        //                 <p><span className='line-through'>$225.00</span> $190.00</p>
        //                 <Image src={prom3} alt='promotion' />
        //             </div>
        //         </div>
        //     </section>
        // </WrapperMaxWidth>

        // <WrapperMaxWidth>
        //     <section className='w-full'>
        //         <h3 className='uppercase text-center text-blue-600 text-sm font-bold'>PROMOTIONS</h3>
        //         <p className='text-center text-4xl font-bold'>Our Promotions Events</p>
        //         <div className='flex justify-between gap-8'>
        //             <div className='LEFT gap-4 flex-grow-[2] flex-shrink basis-0 flex-col'>
        //                 <div className='bg-gray-300 items-center flex justify-between'>
        //                     <div>
        //                         <p className='text-4xl font-bold'>GET UP TO 60%</p>
        //                         <p className='text-lg'>For the summer season</p>
        //                     </div>
        //                     <Image src={prom1} alt='promotion' />
        //                 </div>
        //                 <div className='bg-gray-900 text-white flex justify-center items-center flex-col'>
        //                     <p className='text-4xl font-bold'>GET 30% Off</p>
        //                     <p className='text-lg'>USE PROMO CODE</p>
        //                     <button className='text-lg font-bold tracking-widest bg-white/20 rounded-md'>DINE WEEKEND SALE</button>
        //                 </div>
        //             </div>
        //             <div className='RIGHT flex justify-between items-center gap-4 flex-1'>
        //                 <div className='bg-orange-300 flex flex-col justify-between items-center'>
        //                     <p>Flex Sweatshirt</p>
        //                     <p><span className='line-through'>$100.00</span> $75.00</p>
        //                     <Image src={prom2} alt='promotion' />
        //                 </div>
        //                 <div className='bg-gray-300 flex flex-col justify-between items-center'>
        //                     <p>Flex Push Button Bomber</p>
        //                     <p><span className='line-through'>$225.00</span> $190.00</p>
        //                     <Image src={prom3} alt='promotion' />
        //                 </div>
        //             </div>
        //         </div>
        //     </section>
        // </WrapperMaxWidth>

        <WrapperMaxWidth>
            <section className='w-full space-y-4 mt-24'>
                <h3 className='uppercase text-center text-blue-600 text-sm font-bold'>PROMOTIONS</h3>
                <p className='text-center text-4xl font-bold'>Our Promotions Events</p>
                <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-4'>
                    {/* <div className='LEFT'> */}
                    <div className='bg-gray-300 flex items-center col-span-2 px-8 justify-between'>
                        <div>
                            <p className='text-4xl font-bold'>GET UP TO 60%</p>
                            <p className='text-lg'>For the summer season</p>
                        </div>
                        <Image src={prom1} alt='promotion' className='self-end' />
                    </div>
                    <div className='py-6 bg-gray-900 text-white flex justify-center items-center flex-col col-span-2 row-start-2 gap-y-2'>
                        <p className='text-4xl font-bold'>GET 30% Off</p>
                        <p className=''>USE PROMO CODE</p>
                        <button className='text-lg font-bold tracking-[0.2rem] bg-white/20 rounded-md px-8 py-2'>DINE WEEKEND SALE</button>
                    </div>
                    {/* </div> */}
                    <div className='bg-orange-300 col-span-2 sm:col-span-1 row-span-2 space-y-4 flex flex-col justify-between'>
                        <div className='ml-[1.4rem] mt-4'>
                            <p>Flex Sweatshirt</p>
                            <p className='font-semibold'><span className='line-through font-normal'>$100.00</span> $75.00</p>
                        </div>
                        <Image src={prom2} alt='promotion' className='self-center'/>
                    </div>
                    <div className='bg-gray-300 col-span-2 sm:col-span-1 row-span-2 space-y-4 flex flex-col justify-between'>
                        <div className='ml-[1.4rem] mt-4'>
                            <p >Flex Push Button Bomber</p>
                            <p className='font-semibold'><span className='line-through font-normal'> $225.00</span> $190.00</p>
                        </div>
                        <Image src={prom3} alt='promotion'  className='self-center'/>
                    </div>
                </div>
            </section>
        </WrapperMaxWidth>

    )
}
