'use client';

import React from 'react';
import RatingComponent from './RatingComponent';
import Product from './Product';
import { clientFetch } from '@/sanity/lib/client';
import { useSearchParams } from 'next/navigation';
import LinearProgress from '@mui/material/LinearProgress';

interface Props {
  initialProducts: Product[];
  totalProducts: number;
  sortedBy: string;
}

export default function Products({
  initialProducts,
  totalProducts,
  sortedBy,
}: Props) {
  const sortedByParamT = useSearchParams().get('sort')
    ? useSearchParams().get('sort')
    : '_id';
  console.log('sortedByParamT', sortedByParamT);
  // const [lastId, setLastId] = React.useState<string>(
  //   initialProducts[initialProducts.length - 1]._id
  // );
  const [sortedByParam, setSortedByParam] = React.useState<string>(
    sortedByParamT!!
  );
  const [lastKey, setLastKey] = React.useState<any>(
    getLastSortKey(sortedByParam!, initialProducts)
  );

  const [viewedProducts, setViewedProducts] = React.useState<number>(
    initialProducts.length
  );

  const pageSize = useSearchParams().get('pageSize') || 3;

  React.useEffect(() => {
    setViewedProducts(initialProducts.length);
  }, [pageSize, sortedByParamT]);

  async function loadMoreProducts() {
    console.log('loading more products');
    console.log(getCompareStatement(sortedByParam, lastKey));
    console.log(convert(sortedByParam));

    const products: Product[] =
      await clientFetch(`*[_type == "product" && Category->href == "dator-surfplatta" && ${getCompareStatement(
        sortedByParamT!,
        lastKey
      )}] | order(${convert(sortedByParamT!)}) [0...3] {
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
    // setLastId(products[products.length - 1]._id);
    setLastKey(getLastSortKey(sortedByParamT!, products));
    setViewedProducts(viewedProducts + products.length);
  }

  return (
    <div className='flex flex-col w-full'>
      <div className='grid grid-cols-1 w-full gap-3 md:grid-cols-2 lg:grid-cols-3'>
        {initialProducts.map((product) => {
          return <Product key={product.ArtikelNummer} product={product} />;
        })}
      </div>

      <div className='flex flex-col items-center w-full'>
        <div className='w-1/2 gap-3 flex flex-col justify-center p-2'>
          <p className='text-sm'>
            Du har sett {viewedProducts} av {totalProducts} produkter
          </p>
          <LinearProgress
            color='info'
            variant='determinate'
            value={(viewedProducts / totalProducts) * 100}
          />
          <button
            className='py-2 flex justify-center text-white font-semibold text-lg items-center bg-light-blue-500'
            onClick={loadMoreProducts}
          >
            {viewedProducts < totalProducts
              ? 'Visa fler'
              : 'No more products sir '}
          </button>
        </div>
      </div>
    </div>
  );
}
function convert(SortedBy: string) {
  if (!SortedBy) return '_id asc';
  if (SortedBy === 'price_asc') return 'details.price asc';
  if (SortedBy === 'price_desc') return 'details.price desc';
  if (SortedBy === 'name_asc') return 'title asc';
  if (SortedBy === 'name_desc') return 'title desc';
}

function getLastSortKey(SortedBy: string, products: Product[]) {
  if (!SortedBy) return products[products.length - 1]._id;
  if (SortedBy === 'price_asc')
    return products[products.length - 1].details.price;
  if (SortedBy === 'price_desc')
    return products[products.length - 1].details.price;
  if (SortedBy === 'name_asc') return products[products.length - 1].title;
  if (SortedBy === 'name_desc') return products[products.length - 1].title;
}

function getCompareStatement(SortedBy: string, lastSomething: any) {
  console.log(lastSomething);

  // if sortedBy == price_asc do string manipulation and include lastsomething
  if (!SortedBy) return `_id > "${lastSomething}"`;
  if (SortedBy === 'price_asc') return `details.price > ${lastSomething}`;
  if (SortedBy === 'price_desc') return `details.price < ${lastSomething}`;
  if (SortedBy === 'name_asc') return `title > "${lastSomething}"`;
  if (SortedBy === 'name_desc') return `title < "${lastSomething}"`;
}
