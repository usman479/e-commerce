'use client'
import Image from 'next/image'
import { urlForImage } from '@/sanity/lib/image'
import { Image as SanityImage } from 'sanity';
import { FC } from 'react';
import Link from 'next/link';

interface IProps {
    _id: string;
    image: SanityImage;
    price: number;
    title: string
}

export default function ProductCard({ _id, image, title, price }: IProps) {

    const handleAddToCart = async () => {
        const res = await fetch('/api/cart', {
            method: 'POST',
            body: JSON.stringify({
                product_id: _id,
            })
        })

        const result = await res.json();
        console.log(result)
    }


    return (
        // <div key={_id}>
        //     <Image src={urlForImage(image).url()} alt='product' width={200} height={300} className='max-h-[200px] object-cover object-top' />
        //     <h2>{title}</h2>
        //     <h3>${price}</h3>
        //     <button className='border py-2 px-6 rounded bg-blue-600 text-white' onClick={handleAddToCart}>Add to Cart</button>
        // </div>
        <Link href={`/product/${_id}`}>
        <div>
            <Image src={urlForImage(image).url()} width={200} height={800} alt={title} className='h-96'/>
            <h2 className='font-semibold text-lg'>{title}</h2>
            <h3 className='text-gray-500'>Sweater</h3>
            <h2 className='text-lg font-semibold'>${price}</h2>
        </div>
        </Link>
    )
}
