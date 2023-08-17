import React from 'react'
import Image from 'next/image'
import { urlForImage } from '@/sanity/lib/image'
import Link from 'next/link'

export default function ProductCard({ product }: { product: Product }) {
    return (
        <Link href={`/product/${product._id}`}>
            <div className='flex flex-col hover:scale-105 cursor-pointer duration-200'>
                <Image src={urlForImage(product.image).url()} alt='product' width={400} height={600} />
                <h3 className='font-bold'>{product.title}</h3>
                <p>{product.type}</p>
                <p className='font-bold'>${product.price}</p>
            </div>
        </Link>
    )
}
