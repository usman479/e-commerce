// 'use client'
import React from 'react'
// import { Transition } from '@headlessui/react'
import { client } from '@/lib/sanityClient'
// import { product } from '@/sanity/product';
// import Image from 'next/image';
// import { urlForImage } from '@/sanity/lib/image';
// import { Image as SanityImage } from 'sanity';
import WrapperMaxWidth from '@/components/WrapperMaxWidth';
import ProductCard from '@/components/ProductCard';
// import { useState } from 'react'




async function getProducts() {
  const data = await client.fetch(`*[_type=="product" && category->name == 'Female'] {
    price, 
    _id,
    title,
    image,
    type,
    alt,
    category -> {
      name
    }
  }`);
  return data
}



export default async function page() {
  const products: Product[] = await getProducts();
  // console.log(products.length)
  return (
    <WrapperMaxWidth>
      <section className='grid grid-cols-1 justify-items-center  sm:grid-cols-3 md:grid-cols-4  xl:grid-cols-5 gap-x-8 gap-y-12 '>
        {/* <h1>ere</h1> */}
        {products.map((product) => (
          <ProductCard product={product} key={product._id}/>
        ))}
      </section>
    </WrapperMaxWidth>
  )
}
