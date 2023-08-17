'use client'
import React from 'react'
import Image from 'next/image'
import { Trash, Trash2, ShoppingBag } from 'lucide-react'
import WrapperMaxWidth from '@/components/WrapperMaxWidth'
import AddToCart from '@/components/AddToCart'
import prod1 from '@/public/prod1.png'
import { useSelector, useDispatch } from 'react-redux';
import { selectCart, getCartStatus, getCartError, selectTotalPrice } from '@/redux/features/cart/cartSlice'
import { AppDispatch } from '@/redux/store'
import CartPageCard from '@/components/CartPageCard'
import { useState } from 'react'

export default function CartPage() {
    // const dispatch = useDispatch<AppDispatch>();
    const cart = useSelector(selectCart);
    const cartStatus = useSelector(getCartStatus);
    const error = useSelector(getCartError)
    // const totalPrice = useSelector(selectTotalPrice);
    let initialTotalPrice = 0;
    const [totalPrice, setTotalPrice] = useState(0);


    let content;
    let quantity = 0;
    // let amount = 0;

    if (cartStatus === 'loading') {
        content = <p className='flex justify-start items-center'>Loading...</p>
    } else if (cartStatus === 'succeeded') {
        cart.forEach(item => {
            quantity += item.quantity
            // amount += item.
        })
        let orderedCart = [...cart];
        orderedCart = orderedCart.sort((a, b) => a.id - b.id)

        content = (
            <section className='space-y-4'>
                {orderedCart.length < 1 ? <div className='flex flex-col justify-start items-center gap-y-8'><ShoppingBag size={80} /><p className='text-2xl  md:text-3xl font-bold' >Your shopping bag is empty</p></div>
                    :
                    cart.map(item => (
                        <CartPageCard product_id={item.product_id} quantity={item.quantity} id={item.id} key={item.id} setTotalPrice={setTotalPrice} />
                    ))
                }
                {orderedCart.length < 1 ? null : <div className='flex flex-col gap-y-4 bg-gray-100 p-6'>
                    <h3 className='text-3xl font-semibold self-center'>Order Summary</h3>
                    <div className='flex justify-between text-lg font-semibold'>
                        <p>Subtotal</p>
                        <p>${totalPrice}</p>
                    </div>
                    <div className='flex justify-between text-lg font-semibold'>
                        <p>Delivery Charges</p>
                        <p>$10</p>
                    </div>
                    <div className='flex justify-between text-lg font-semibold'>
                        <p>Order total</p>
                        <p>${totalPrice + 10}</p>
                    </div>
                    <div className='flex justify-center'>
                        <button className='bg-green-600 text-white px-6 py-2 hover:scale-105 duration-200'>Checkout</button>
                    </div>
                </div>}
            </section >
        )

        console.log(totalPrice)
        // cart.forEach(item => {
        //     noOfItems += item.quantity;
        // })
    } else if (cartStatus === 'failed') {
        console.log(error)
    }

    return (
        <WrapperMaxWidth>
            <h1 className='text-4xl font-bold my-6'>Shopping Cart</h1>
            {content}
        </WrapperMaxWidth>
    )
}
