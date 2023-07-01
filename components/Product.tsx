'use client';

import React from 'react';
import RatingComponent from './RatingComponent';

interface Props {
  product: Product;
}

export default function Product({ product }: Props) {
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
        <p className='text-gray-600 font-light text-xs'>{product.title}</p>
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
}