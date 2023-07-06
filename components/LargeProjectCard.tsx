'use client';

import React from 'react';
import RatingComponent from './RatingComponent';
import { useCartStore } from '@/stateStores/useCartStore';

interface props {
  product: Product;
}

export default function LargeProjectCard({ product }: props) {
  const addToCart = useCartStore((state) => state.addToCart);

  const handleClick = () => {
    let item = {
      id: product.ArtikelNummer,
      name: product.CardName,
      price: product.details.price,
      Image: product.Images[0].asset.url,
    };
    addToCart(item);
  };

  return (
    <div className='p-4 bg-white shadow flex flex-col md:flex-row'>
      <div className='flex-[8] flex-col space-y-2'>
        <h2 className='text-4xl font-semibold'>{product.CardName}</h2>
        <p className='text-gray-500 text-sm'>
          {product.title} Art.nr: {product.ArtikelNummer}
        </p>
        <RatingComponent />
        <div className='flex flex-col md:flex-row md:space-x-10'>
          <ul className='list-disc text-lg space-y-4 text-gray-800 list-inside flex-1 py-14'>
            {product.bulletPoints.map((bulletPoint) => (
              <li key={bulletPoint}>{bulletPoint}</li>
            ))}
          </ul>
          <img src={product.Images[0].asset.url} className='py-3 flex-1' />
        </div>
      </div>
      <div className='flex-[2] pt-2 flex-col justify-between  items-center space-y-2'>
        <div className='flex-grow flex flex-col justify-end'>
          <span className='flex bg-gray-300/50 items-center justify-center'>
            <h2 className='p-2 flex-5 font-semibold text-red-600 text-4xl'>
              {product.details.price.toLocaleString('sv-SE')}:-
            </h2>
          </span>
        </div>

        <div className='flex flex-col md:flex-row items-end gap-2 justify-end w-full'>
          <button
            onClick={handleClick}
            className='bg-light-blue-500 hover:bg-light-blue-700 transition-colors text-white text-lg w-full font-bold p-2'
          >
            Lägg i kundvagn
          </button>
        </div>
      </div>
    </div>
  );
}
