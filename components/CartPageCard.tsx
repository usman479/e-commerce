import React from 'react'
import prod1 from '@/public/prod1.png'
import Image from 'next/image'
import { Trash2, Minus, Plus } from 'lucide-react'
import { client } from '@/lib/sanityClient'
import { urlForImage } from '@/sanity/lib/image'
import { useEffect, useState } from 'react'
import { Image as SanityImage } from 'sanity'
import { AppDispatch } from '@/redux/store'
import { useDispatch } from 'react-redux';
import { deleteItem, getTotalPrice, updateItem } from '@/redux/features/cart/cartSlice'
// import toast, { Toaster } from 'react-hot-toast';


async function getItem(product_id: string) {
    const res = await client.fetch(`*[_type=="product" && _id == "${product_id}"] {
        price, 
        _id,
        title,
        type,
        image,
        category -> {
          name
        }
      }`);

    return res;

}

interface IItem {
    title: string,
    type: string,
    price: number,
    _id: string,
    category: {
        name: string
    },
    image: SanityImage
}

export default function CartPageCard({ product_id, quantity, id, setTotalPrice }: { product_id: string, quantity: number, id: number, setTotalPrice: React.Dispatch<React.SetStateAction<number>> }) {
    // const item = await getItem(product_id);
    const [item, setItem] = useState<IItem | null>(null);
    const [count, setCount] = useState(quantity);
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        client.fetch(`*[_type=="product" && _id == "${product_id}"][0] {
            price, 
            _id,
            title,
            type,
            image,
            category -> {
              name
            }
          }`).then(data => setItem(prev => data))
    }, [])


    useEffect(() => {
        if (item) {
            setTotalPrice(prev => (item?.price * quantity) + prev)
        }
    }, [item])



    if (item) {
        const handleDelete = (id: number) => {
            dispatch(deleteItem(id)).unwrap();
            console.log('item deleted')
            setTotalPrice(prev => 0);
            // toast('Here is your toast.');
        }
        const handleUpdate = (product_id: string) => {
            if (count !== quantity) {
                dispatch(updateItem({ product_id, quantity: count })).unwrap();
                setTotalPrice(prev => 0)
            }
            console.log('item updated')
        }

        // foo();
        return (
            <>
                <div className='flex gap-x-8  flex-wrap' >
                    {/* <Toaster/> */}
                    <Image src={urlForImage(item.image).url()} alt='product' width={250} height={400} className='rounded-md' />
                    {/* <div className='flex gap-x-8'> */}


                    <div className='flex flex-col justify-between'>
                        <p className='text-2xl'>{item.title}</p>
                        <p className='text-gray-700 text-lg'>{item.type}</p>
                        <p>Delivery Estimation</p>
                        <p className='text-lg text-orange-400 font-semibold'>5 Working Days</p>
                        <p className='text-2xl font-semibold'>${item.price * count}</p>
                    </div>
                    <div className='flex flex-col justify-between items-center'>
                        <Trash2 className='hover:text-red-500 cursor-pointer' size={35} onClick={() => handleDelete(id)} />
                        <div className='flex justify-between'>
                            <Minus className='bg-gray-200 rounded-full p-2 cursor-pointer hover:scale-105' size={40} onClick={() => setCount(prev => prev == 1 ? 1 : prev - 1)} />
                            <p className='text-2xl'>{count}</p>
                            <Plus className='bg-gray-200 rounded-full p-2 cursor-pointer hover:scale-105' size={40} onClick={() => setCount(prev => prev + 1)} />
                        </div>
                        <button className='flex items-center bg-gray-900 text-white py-2 px-4 select-none' onClick={() => handleUpdate(product_id)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                            </svg>
                            Update Item
                        </button>
                    </div>
                    {/* </div> */}
                </div>
                <hr />
            </>
        )
    }
}
