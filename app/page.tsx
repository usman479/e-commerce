import Image from 'next/image'
import { client } from '@/lib/sanityClient'
import { urlForImage } from '@/sanity/lib/image'
import { Image as SanityImage } from 'sanity'
import ProductCard from './ProductCard'
import Hero from '@/components/Hero'
import Promotion from '@/components/Promotion'
import CheckWhatWeHave from '@/components/CheckWhatWeHave'
import Subscribe from '@/components/Subscribe'
import Footer from '@/components/Footer'
import { cookies } from 'next/headers'

type Product = {
  _id: string,
  price: number,
  title: string,
  description: string,
  image: SanityImage,
  category: {
    name: string
  }
}

// const builder = imageUrlBuilder(client);

// function urlFor(source: SanityImage) {
//   return builder.image(source)
// }

export const getProduct = async (): Promise<Product[]> => {
  const res: Product[] = await client.fetch(`*[_type=='product']{
    price,
      _id,
      title,
      image,
      category -> {
        name,
        _id
      }
  }`)

  return res;
}

// export const getTest = async () => {
//   const check = await fetch('http://localhost:3000/api/testing');

//   return check;
// } 

interface ISearchParams {
  success: string
}

async function clearCookie() {

  console.log(process.env.NEXT_PUBLIC_SITE_URL)
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}api/clear-cookie`,{
    cache: 'no-store'
  });

  return true;
}

export default async function Home({ searchParams }: { searchParams: ISearchParams  | undefined }) {
  // const data: Product[] = await getProduct();
  // console.log(searchParams)
  let param:string|undefined;
  if(searchParams?.success){
    param = searchParams.success;
  }

  // const check = await getTest();
  // console.log('nigga:',await check.json())
  return (
    <>


      <Hero />
      <Promotion />
      <CheckWhatWeHave searchParam={param} />
      <Subscribe />

      {/* <div className='flex flex-wrap items-start justify-start gap-x-16 ml-[53px] mr-[53px]'>
        <h1>Products</h1>
        {data.map(product => {
          return <ProductCard key={product._id} _id={product._id} image={product.image} price={product.price} title={product.title} />
        })}
      </div> */}
    </>
  )
}
