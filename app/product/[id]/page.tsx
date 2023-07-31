import { client } from '@/lib/sanityClient'
import { urlForImage } from '@/sanity/lib/image';
import Image from 'next/image';

const getProduct = async (id: string) => {
  const res = await client.fetch(`*[_type == 'product' && _id == '${id}']`);

  return res[0];
}

const productPage = async ({ params: { id } }: { params: { id: string } }) => {
  const product = await getProduct(id);
  console.log('prod: ', product)
  return (
    <div className='flex flex-wrap mx-[53px] justify-center gap-x-6'>
      <div className='flex gap-x-12'>
        <div className='gap-y-40'>
          <Image src={urlForImage(product.image).url()} alt={product.title} height={600} width={200} className='w-[6rem] h-[6rem]' />
          <Image src={urlForImage(product.image).url()} alt={product.title} height={600} width={200} className='w-[6rem] h-[6rem]' />
          <Image src={urlForImage(product.image).url()} alt={product.title} height={600} width={200} className='w-[6rem] h-[6rem]' />
          <Image src={urlForImage(product.image).url()} alt={product.title} height={600} width={200} className='w-[6rem] h-[6rem]' />
        </div>
        <Image src={urlForImage(product.image).url()} alt={product.title} height={600} width={200} className='w-[28rem] h-[32rem]' />
      </div>
      <div className='mt-16'>
        <h1 className='text-3xl font-semibold'>{product.title}</h1>
        <h2 className='text-gray-500 text-lg'>Sweater</h2>
        <h3 className='font-medium mt-4'>SELECT SIZE</h3>
        <ul className='flex gap-x-3'>
          <li>XS</li>
          <li>S</li>
          <li>M</li>
          <li>L</li>
          <li>XL</li>
        </ul>
        <div className='flex items-center mt-4'>
          <h3>Quantity:</h3>
          {/* Counter */}
        </div>
        <div className='flex items-center mt-4  gap-x-4'>
          <button className='flex items-center bg-gray-900 text-white py-2 px-4'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
            Add to Cart
          </button>
          <p className='text-lg font-medium'>${product.price}</p>
        </div>
      </div>
    </div>
  )
}

export default productPage