import { getProductsByCategory } from '@/sanity/helpers/queries';
import { client } from '@/sanity/lib/client';
import React from 'react';

async function getProducts() {
  const data = await client.fetch(getProductsByCategory('dator-surfplatta'));

  return data;
}

interface Product {
  title: string;
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
    <div className='grid grid-cols-3 gap-3'>
      {products.map((product) => {
        // we only have 1 images per product for now, its too much work to add more
        if (!product.Images) return null;
        return (
          <div key={product.ArtikelNummer} className='flex flex-col gap-2'>
            <h2>{product.title}</h2>
            <img src={product.Images[0].asset.url} alt='' />

            <p>{product.details.description}</p>
            <p>{product.details.price}</p>
          </div>
        );
      })}
    </div>
  );
}
