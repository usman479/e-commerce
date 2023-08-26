import AddToCart from '@/components/AddToCart';
import WrapperMaxWidth from '@/components/WrapperMaxWidth';
import { client } from '@/lib/sanityClient'
import { urlForImage } from '@/sanity/lib/image';
import Image from 'next/image';

const getProduct = async (id: string) => {
  const res = await client.fetch(`*[_type == 'product' && _id == '${id}']`);

  return res[0];
}

const productPage = async ({ params: { id } }: { params: { id: string } }) => {
  const product = await getProduct(id);
  // console.log('prod: ', product)
  return (
    <WrapperMaxWidth>


      <div className='flex flex-wrap justify-center gap-x-6 items-center'>

        <Image src={urlForImage(product.image).url()} alt={product.title} height={600} width={400} className='flex-1' />

        <div className='mt-16 justify-items-start self-start flex-1'>
          <h1 className='text-3xl font-semibold'>{product.title}</h1>
          <h2 className='text-gray-500 text-lg'>Sweater</h2>
          <h3 className='font-semibold mt-4'>SELECT SIZE</h3>
          <ul className='flex gap-x-6 text-lg text-gray-600'>
            <li className='rounded-full hover:shadow-2xl p-2  cursor-pointer' >XS</li>
            <li className='rounded-full hover:shadow-2xl p-2  cursor-pointer' >S</li>
            <li className='rounded-full hover:shadow-2xl p-2  cursor-pointer' >M</li>
            <li className='rounded-full hover:shadow-2xl p-2  cursor-pointer' >L</li>
            <li className='rounded-full hover:shadow-2xl p-2  cursor-pointer' >XL</li>
          </ul>
          <AddToCart price={product.price} productId={id}/>
        </div>
      </div>
    </WrapperMaxWidth>
  )
}

export default productPage