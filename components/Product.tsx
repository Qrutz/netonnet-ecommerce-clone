'use client';

import React from 'react';
import RatingComponent from './RatingComponent';
import Link from 'next/link';
import { useCartStore } from '@/stateStores/useCartStore';

interface Props {
  product: Product;
  showAddToCart?: boolean;
}

export default function Product({ product, showAddToCart }: Props) {
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

  if (!product.Images) return null;

  if (showAddToCart) {
    return (
      <div
        key={product.ArtikelNummer}
        className='flex border bg-white justify-between gap-2 flex-col p-3'
      >
        <Link
          prefetch={false}
          as={`/art/${product.Category.slug.current}/${product.subcategory.slug.current}/${product.subsubcategory.slug.current}/${product.slug.current}`}
          href={`/${product.slug.current}`}
        >
          <img
            className='cursor-pointer max-w-full h-auto'
            src={product.Images[0].asset.url}
            alt=''
          />
        </Link>
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
              <button
                onClick={handleClick}
                className='bg-light-blue-600 hover:bg-light-blue-900 transition-colors w-full text-white font-semibold py-2 px-4 border-blue-700 rounded'
              >
                Lägg i varukorg
              </button>
            </span>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div
        key={product.ArtikelNummer}
        className='flex  bg-white justify-between   flex-col px-3 md:px-7'
      >
        <Link
          prefetch={false}
          as={`/art/${product.Category.slug.current}/${product.subcategory.slug.current}/${product.subsubcategory.slug.current}/${product.slug.current}`}
          href={`/${product.slug.current}`}
        >
          <img
            width={200}
            height={200}
            className='cursor-pointer max-w-full h-auto'
            src={product.Images[0].asset.url}
            alt=''
          />
        </Link>
        <div>
          <h2 className='font-bold md:text-md text-xs md:line-clamp-none line-clamp-2'>
            {product.CardName}
          </h2>
          <p className='text-gray-600 font-light text-xs md:line-clamp-none line-clamp-2'>
            {product.title}
          </p>
        </div>
        <RatingComponent />

        <div className='flex flex-col justify-between'>
          <ul className='list-disc text-sm text-gray-600 list-inside hidden lg:block'>
            {product.bulletPoints.map((bulletPoint, index) => {
              if (index > 2) {
                return null; // Stop mapping when index is 3
              }
              return <li key={bulletPoint}>{bulletPoint}</li>;
            })}
          </ul>
        </div>

        <div className=''>
          <span className='text-red-700  font-semibold text-3xl'>
            {product.details.price.toLocaleString('sv-SE')}:-
          </span>
        </div>
      </div>
    );
  }
}
