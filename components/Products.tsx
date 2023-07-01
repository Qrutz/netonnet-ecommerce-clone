'use client';

import React from 'react';
import RatingComponent from './RatingComponent';
import Product from './Product';
import { clientFetch } from '@/sanity/lib/client';
import { useSearchParams } from 'next/navigation';
import LinearProgress from '@mui/material/LinearProgress';
import { set } from 'sanity';

interface Props {
  initialProducts: Product[];
  totalProducts: number;
  sortedBy: string;
  pageSize: number;
  categoryHref: string;
  InitialLastKey: string | number;
}

export default function Products({
  initialProducts,
  totalProducts,
  sortedBy,
  pageSize,
  categoryHref,
  InitialLastKey,
}: Props) {
  const [state, setState] = React.useState({
    lastKey: InitialLastKey,
    viewedProducts: initialProducts.length,
    products: [...initialProducts],
  });

  React.useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      viewedProducts: initialProducts.length,
      lastKey: InitialLastKey,
      products: [...initialProducts],
    }));
  }, [pageSize, sortedBy, initialProducts, InitialLastKey]);

  async function loadMoreProducts() {
    const sortOptions = parseSortString(sortedBy);
    const { field, order } = sortOptions;

    const sortSign = order === 'asc' ? '>' : '<';
    let tempLastKey = state.lastKey;
    // if lastkey is a string wrap it in quotes
    if (typeof state.lastKey === 'string') tempLastKey = `"${state.lastKey}"`;
    const products: Product[] = await clientFetch(
      `*[_type == "product" && Category->href == "${categoryHref}" && ${field} ${sortSign} ${tempLastKey} ] | order(${field} ${order}) [0...${pageSize}] {
        _id,
        title,
        CardName,
        bulletPoints[],
        Images[]{_key, asset->{url}},
        ArtikelNummer,
        details,
      }`
    ).then((data) => data);

    setState((prevState) => ({
      ...prevState,
      products: [...prevState.products, ...products],
      lastKey: getLastKey(products, sortedBy),
      viewedProducts: prevState.viewedProducts + products.length,
    }));
  }

  function parseSortString(sortedBy: string) {
    if (sortedBy === 'price_asc')
      return { field: 'details.price', order: 'asc' };
    if (sortedBy === 'price_desc')
      return { field: 'details.price', order: 'desc' };
    if (sortedBy === 'name_asc') return { field: 'title', order: 'asc' };
    if (sortedBy === 'name_desc') return { field: 'title', order: 'desc' };
    return { field: '_id', order: 'asc' };
  }

  function getLastKey(products: Product[], sortedBy: string) {
    const lastKey = products[products.length - 1];
    if (sortedBy === 'price_asc') return lastKey.details.price;
    if (sortedBy === 'price_desc') return lastKey.details.price;
    if (sortedBy === 'name_asc') return lastKey.title;
    if (sortedBy === 'name_desc') return lastKey.title;
    else return lastKey._id;
  }

  return (
    <div className='flex flex-col w-full'>
      <div className='grid grid-cols-1 w-full gap-3 md:grid-cols-2 lg:grid-cols-3'>
        {state.products.map((product) => {
          return <Product key={product.ArtikelNummer} product={product} />;
        })}
      </div>

      <div className='flex flex-col items-center w-full'>
        <div className='w-1/2 gap-3 flex flex-col justify-center p-2'>
          <p className='text-sm'>
            Du har sett {state.viewedProducts} av {totalProducts} produkter
          </p>
          <LinearProgress
            color='info'
            variant='determinate'
            value={(state.viewedProducts / totalProducts) * 100}
          />
          <button
            className='py-2 flex justify-center text-white font-semibold text-lg items-center bg-light-blue-500'
            onClick={loadMoreProducts}
            disabled={state.viewedProducts >= totalProducts} // Disable button when all products have been viewed
          >
            {state.viewedProducts < totalProducts
              ? 'Visa fler'
              : ' No more products sir '}
          </button>
        </div>
      </div>
    </div>
  );
}
