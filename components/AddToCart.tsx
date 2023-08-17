'use client'
import { useState } from 'react'
import React from 'react'
import { Plus, Minus } from 'lucide-react';
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/redux/store';
import { addItem } from '@/redux/features/cart/cartSlice';

export default function AddToCart({ price, productId }: { price: number, productId: string }) {
    const [count, setCount] = useState(1);
    const dispatch = useDispatch<AppDispatch>();

    const handleAddToCart = () => {
        dispatch(addItem({ product_id: productId, quantity: count })).unwrap();
    }
    return (
        <>
            <div className='flex items-center mt-4 gap-x-4'>
                <h3 className='font-semibold'>Quantity:</h3>
                {/* <button className='text-6xl bg-gray-100 rounded-md p-2 font-light'>-</button> */}
                <Minus className='bg-gray-200 rounded-full p-2 cursor-pointer hover:scale-105' size={40} onClick={() => setCount(prev => prev == 1 ? 1 : prev - 1)} />
                <p className='text-2xl'>{count}</p>
                <Plus className='bg-gray-200 rounded-full p-2 cursor-pointer hover:scale-105' size={40} onClick={() => setCount(prev => prev + 1)} />
                {/* <button className='text-6xl bg-gray-300 rounded-md p-2 font-light'>+</button> */}
                {/* Counter */}
            </div>
            <div className='flex items-center mt-4  gap-x-4'>
                <button className='flex items-center bg-gray-900 text-white py-2 px-4 select-none' onClick={handleAddToCart}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                    </svg>
                    Add to Cart
                </button>
                <p className='text-xl font-semibold'>${price}</p>
            </div>
        </>
    )
}
