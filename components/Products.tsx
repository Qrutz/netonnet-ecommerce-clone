'use client';

import React from 'react';
import RatingComponent from './RatingComponent';
import Product from './Product';
import { clientFetch } from '@/sanity/lib/client';
import { useSearchParams } from 'next/navigation';

interface Props {
  initialProducts: Product[];
}

export default function Products({ initialProducts }: Props) {
  const [lastId, setLastId] = React.useState<string>(
    initialProducts[initialProducts.length - 1]._id
  );

  async function loadMoreProducts() {
    console.log('loading more products');
    const products: Product[] =
      await clientFetch(`*[_type == "product" && Category->href == "dator-surfplatta" && _id > "${lastId}"] | order(_id asc) [0...3] {
            _id,
            title,
            CardName,
            bulletPoints[],
            Images[]{_key, asset->{url}},
            ArtikelNummer,
            details,
            }`).then((data) => {
        return data;
      });

    initialProducts.push(...products);
    setLastId(products[products.length - 1]._id);
  }

  return (
    <div className='grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3'>
      {initialProducts.map((product) => {
        return <Product key={product.ArtikelNummer} product={product} />;
      })}

      <button onClick={loadMoreProducts}>Load more</button>
    </div>
  );
}
