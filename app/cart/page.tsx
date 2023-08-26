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
import CartSideBar from '@/components/CartSideBar'
import getStripePromise from '@/stripe/stripe'
import { urlForImage } from '@/sanity/lib/image'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

export default function CartPage() {
    // const dispatch = useDispatch<AppDispatch>();
    const cart = useSelector(selectCart);
    const cartStatus = useSelector(getCartStatus);
    const error = useSelector(getCartError)
    const [disableCheckout, setDisableCheckout] = useState(false);
    // const totalPrice = useSelector(selectTotalPrice);
    let initialTotalPrice = 0;
    const [totalPrice, setTotalPrice] = useState(0);
    const [products, setProducts] = useState<Product[] | null>(null);


    let content;
    let quantity = 0;
    // let amount = 0;

    const handleCheckout = async () => {
        setDisableCheckout(true)
        const stripe = await getStripePromise();

        const body = products?.map(item => ({
            name: item.title,
            price: item.price,
            quantity: item.quantity,
            image: urlForImage(item.image).url(),
            product_id:item._id
        }))
        const response = await fetch('/api/stripe-session/', {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        console.log('nig')
        const data = await response.json();
        if (data.session) {
            stripe?.redirectToCheckout({ sessionId: data.session.id })
            
        } else {
            setDisableCheckout(false)
        }
    }

    if (cartStatus === 'loading') {
        content = <>
            <div className='flex justify-between gap-x-8 flex-col sm:flex-row flex-wrap gap-y-8' >
                <div className='flex gap-x-4 '>
                    <Skeleton className='w-[120px] h-[120px] rounded-none bg-gray-300' />
                    <div className='flex flex-col justify-between gap-y-4'>
                        <div className='space-y-2'>
                            <Skeleton className='bg-gray-300 w-32 h-6' />
                            <Skeleton className='bg-gray-300 w-28 h-6' />
                        </div>
                        <Skeleton className='bg-gray-300 w-20 h-6' />
                    </div>
                </div>

                <div className='flex flex-row  sm:flex-col justify-start   sm:justify-between items-center self-end gap-y-4 flex-wrap gap-x-4'>
                    <div className='flex items-center gap-x-4'>
                        <div className='flex justify-between items-center gap-x-1'>
                            <Skeleton className='bg-gray-300 w-8 h-8 rounded-full' />
                            <Skeleton className='bg-gray-300 w-6 h-6 ' />
                            <Skeleton className='bg-gray-300 w-8 h-8 rounded-full' />
                        </div>
                        <Skeleton className='bg-gray-300 w-12 h-12 ' />
                    </div>
                    <Skeleton className='bg-gray-300 w-40 h-12 rounded-none' />
                </div>
            </div>
            <div className='flex justify-between gap-x-8 flex-col sm:flex-row flex-wrap gap-y-8 my-8' >
                <div className='flex gap-x-4 '>
                    <Skeleton className='bg-gray-300 w-[120px] h-[120px] rounded-none' />
                    <div className='flex flex-col justify-between gap-y-4'>
                        <div className='space-y-2'>
                            <Skeleton className='bg-gray-300 w-32 h-6' />
                            <Skeleton className='bg-gray-300 w-28 h-6' />
                        </div>
                        <Skeleton className='bg-gray-300 w-20 h-6' />
                    </div>
                </div>

                <div className='flex flex-row  sm:flex-col justify-start   sm:justify-between items-center self-end gap-y-4 flex-wrap gap-x-4'>
                    <div className='flex items-center gap-x-4'>
                        <div className='flex justify-between items-center gap-x-1'>
                            <Skeleton className='bg-gray-300 w-8 h-8 rounded-full' />
                            <Skeleton className='bg-gray-300 w-6 h-6 ' />
                            <Skeleton className='bg-gray-300 w-8 h-8 rounded-full' />
                        </div>
                        <Skeleton className='bg-gray-300 w-12 h-12 ' />
                    </div>
                    <Skeleton className='bg-gray-300 w-40 h-12 rounded-none' />
                </div>
            </div>
        </>
    } else if (cartStatus === 'succeeded') {
        cart.forEach(item => {
            quantity += item.quantity
            // amount += item.
        })
        let orderedCart = [...cart];
        orderedCart = orderedCart.sort((a, b) => a.id - b.id)

        content = (
            // <CartSideBar></CartSideBar>
            <section className='space-y-4'>
                {orderedCart.length < 1 ? <div className='flex flex-col justify-start items-center gap-y-8'><ShoppingBag size={80} /><p className='text-2xl  md:text-3xl font-bold' >Your shopping bag is empty</p></div>
                    :
                    cart.map(item => (
                        <CartPageCard product_id={item.product_id} quantity={item.quantity} id={item.id} key={item.id} setTotalPrice={setTotalPrice} setProducts={setProducts} />
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
                        <p>Calculated at checkout</p>
                    </div>
                    <div className='flex justify-between text-lg font-semibold'>
                        <p>Order total</p>
                        <p>${totalPrice}</p>
                    </div>
                    <div className='flex justify-center'>
                        <button disabled={disableCheckout} className={cn('bg-green-600 text-white px-6 py-2 hover:scale-105 duration-200', {
                            'bg-green-600': !disableCheckout,
                            'bg-gray-400': disableCheckout,
                            'text-black': disableCheckout
                        })} onClick={handleCheckout}>Checkout</button>
                    </div>
                </div>}
            </section >
        )

        console.log(products)
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
