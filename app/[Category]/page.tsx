import RatingComponent from '@/components/RatingComponent';
import { getProductsByCategory } from '@/sanity/helpers/queries';
import { client } from '@/sanity/lib/client';
import React from 'react';

async function getProducts() {
  const data = await client.fetch(getProductsByCategory('dator-surfplatta'));

  return data;
}

interface Product {
  title: string;
  CardName: string;
  bulletPoints: string[];
  ArtikelNummer: string;
  Images?: {
    asset: {
      _key: string;
      url: string;
    };
  }[];

  details: {
    description?: string;
    price: number;
  };
}

export default async function page() {
  const products: Product[] = await getProducts();

  if (!products) {
    return null;
  }

  return (
    <div className='grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3'>
      {products.map((product) => {
        // we only have 1 image per product for now, it's too much work to add more
        if (!product.Images) return null;
        return (
          <div
            key={product.ArtikelNummer}
            className='flex border bg-white justify-between gap-2 flex-col p-3'
          >
            <img
              className='cursor-pointer max-w-full h-auto'
              src={product.Images[0].asset.url}
              alt=''
            />
            <div>
              <h2 className='font-bold text-md'>{product.CardName}</h2>
              <p className='text-gray-600 font-light text-xs'>
                {product.title}
              </p>
            </div>
            <RatingComponent />

            <div className='flex flex-col justify-between'>
              <ul className='list-disc text-sm text-gray-600 list-inside'>
                {product.bulletPoints.map((bulletPoint) => (
                  <li key={bulletPoint}>{bulletPoint}</li>
                ))}
              </ul>

              <div className=''>
                <span className='text-red-700 font-semibold text-3xl'>
                  {product.details.price.toLocaleString('sv-SE')}:-
                </span>

                <span className='flex justify-center w-full  items-center'>
                  <button className='bg-light-blue-600 hover:bg-light-blue-900 transition-colors w-full text-white font-semibold py-2 px-4 border-blue-700 rounded'>
                    Lägg i varukorg
                  </button>
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
