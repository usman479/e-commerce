import React from 'react'
import WrapperMaxWidth from './WrapperMaxWidth'

export default function Subscribe() {
    return (
        <WrapperMaxWidth>
            <div className='flex flex-col gap-y-8 items-center mt-36 relative'>
                <h3 className='text-center text-4xl font-bold capitalize'>Subscribe Our Newsletter</h3>
                <p>Get the latest information and promo offers directly</p>
                {/* <p className='absolute  text-[6.2rem] font-extrabold text-black/5 -z-10 text-center block '>Newsletter</p> */}
                <form className=' flex items-center flex-wrap justify-center gap-4 w-full'>
                    <input type='email' className='border-2 px-6 py-2' placeholder='input email address' />
                    <button className=' bg-black text-white px-6 py-2'>Get Started</button>
                </form>
            </div>
        </WrapperMaxWidth>
    )
}
