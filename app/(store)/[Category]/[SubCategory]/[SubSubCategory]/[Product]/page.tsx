import RatingComponent from '@/components/RatingComponent';
import { client, clientFetch } from '@/sanity/lib/client';
import { Rating } from '@mui/material';
import React from 'react';

async function getProductBySlug(slug: string) {
  console.log('getting product');
  const data = await clientFetch(
    `*[_type == "product" && slug.current == "${slug}"][0] {
      _id,
      title,
      slug {
        current
      },
      Category->{
        slug {
          current
        }
      },
      subcategory->{slug{current}},
      subsubcategory->{slug{current}},
      CardName,
      bulletPoints[],
      Images[]{_key, asset->{url}},
      ArtikelNummer,
      details
    }`
  );

  return data as Product;
}

export default async function page({
  params,
}: {
  params: { Product: string };
}) {
  const product = await getProductBySlug(params.Product);

  return (
    <div className='p-4 bg-white shadow flex'>
      <div className='flex-[8] flex-col space-y-2'>
        {' '}
        <h2 className='text-4xl font-semibold'>{product.CardName}</h2>
        <p className='text-gray-500 text-sm'>
          {product.title} Art.nr: {product.ArtikelNummer}
        </p>
        <RatingComponent />
        <div className='flex px-10'>
          <ul className='list-disc text-lg space-y-4 text-gray-800 list-inside flex-[1] py-14'>
            {product.bulletPoints.map((bulletPoint) => (
              <li key={bulletPoint}>{bulletPoint}</li>
            ))}
          </ul>

          <img src={product.Images[0].asset.url} className='py-3 flex-[1]' />
        </div>
      </div>
      <div className='flex-[2] pt-2 flex-col space-y-2'>
        <p className='text-light-blue-300 cursor-pointer'>Köp som fyndvara</p>

        <div className='bg-gray-300/50 flex-col   flex '>
          <div className='p-4 flex-col  flex'>
            <span className='flex items-center justify-center'>
              <h2 className='flex-[5] text-red-600 text-4xl'>3694</h2>
              <span className='flex-col flex justify-center'>
                <p className='flex-[5] text-gray-500 text-sm'>Delbetala</p>
                353/mån
              </span>
            </span>
          </div>
          <div className='bg-light-blue-300/40 leading-tight p-2 text-sm'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit nulla
            minima beatae!
          </div>
        </div>

        <p className='font-semibold text-sm'>Byt in dina gamla prylar</p>

        <div className='border border-gray-300 text-sm p-2'>
          {' '}
          Jag har prylar som jag vill byta in
        </div>

        <div className='flex gap-2 justify-stretch w-full '>
          <button className='bg-light-blue-500 hover:bg-light-blue-700 transition-colors text-white text-lg font-bold p-2 w-[70%]'>
            Lägg i kundvagn
          </button>
          <button className='border-light-blue-400 hover:bg-gray-200/80 transition-colors  border text-light-blue-400  text-lg w-[30%] font-bold p-2 '>
            Paxa
          </button>
        </div>

        <div className='p-2 bg-blue-gray-200 flex flex-col gap-2 text-sm text-gray-600'>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque,
            enim?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque,
            enim?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque,
            enim?
          </p>
        </div>

        <div className='p-2'></div>
      </div>
    </div>
  );
}
