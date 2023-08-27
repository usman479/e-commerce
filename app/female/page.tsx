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
import Link from 'next/link';
import { cn } from '@/lib/utils';




async function getProducts({ start, end }: { start: number, end: number }) {
  const data = await client.fetch(`*[_type=="product" && category->name == 'Female'] [${start}...${end}] | order(publishedAt desc){
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
  
  const totalRecords = await client.fetch(`count(*[_type == "product"  && category->name == 'Female'])`);

  const res: { products: Product[], totalRecords: number } = { products: data, totalRecords };

  return res;
}

interface ISearchParams {
  page: string
}

export default async function page({ searchParams }: { searchParams: ISearchParams | undefined }) {
  const itemsPerPage = 10;
  const currentPage = searchParams?.page ||  1;
  const offset = (Number(currentPage) - 1) * itemsPerPage;
  const { products, totalRecords } = await getProducts({ start: offset, end:Number(offset) + itemsPerPage });
  const maxPages = Math.ceil(totalRecords / itemsPerPage)
  let pages: number[] = []
  for (let i = Number(currentPage) - 2; i <= Number(currentPage) + 2; i++) {
    if (i < 1) continue;
    if (i > maxPages) break;
    pages.push(i);
  }
  return (
    <WrapperMaxWidth>
      <section className='grid grid-cols-1 justify-items-center  sm:grid-cols-3 md:grid-cols-4  xl:grid-cols-5 gap-x-8 gap-y-12 min-h-screen'>
        {/* <h1>ere</h1> */}
        {products.map((product) => (
          <ProductCard product={product} key={product._id}/>
        ))}
      </section>
      <div className='flex gap-x-4 justify-center items-end my-8'>
        {Number(currentPage) > 1 ? <Link href={`/female?page=${+currentPage-1}`} className='select-none cursor-pointer bg-gray-200 p-2 text-center w-10 h-10 flex justify-center items-center hover:-translate-x-1 duration-300'>{'<<'}</Link> : ''}
        {pages.map(page => (
          // <p className={page == Number(currentPage) ? 'text-white font-bold text-lg' : '' +  'bg-gray-400 p-2 w-8 text-center'} >{page}</p>
          <Link key={page} href={`/female?page=${page}`} className={cn('select-none cursor-pointer bg-gray-200 p-2  w-10 h-10 flex items-center justify-center', {
            'text-orange-400': page == currentPage,
            'font-bold': page == currentPage,
            // 'text-lg': page == currentPage
          })} >{page}</Link>
        ))}
        {Number(currentPage) < maxPages ? <Link href={`/female?page=${+currentPage+1}`} className='select-none cursor-pointer bg-gray-200 p-2 text-center w-10 h-10 flex justify-center items-center hover:translate-x-1 duration-300'>{'>>'}</Link> : ''}
      </div>
    </WrapperMaxWidth>
  )
}
