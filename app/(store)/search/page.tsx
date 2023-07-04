import FilterProductsComponent from '@/components/FilterProductsComponent';
import Products from '@/components/Products';
import { clientFetch } from '@/sanity/lib/client';
import { getLastKey } from '@/utils/parserFunctions/CategoryProductParsers';
import React, { Suspense } from 'react';
import Loading from '../art/[Category]/loading';
import Product from '@/components/Product';

async function searchProducts(query: string) {
  if (!query) return [];
  const res =
    await clientFetch(`*[_type == "product" && title match "*${query}*" && defined(Category) && defined(subcategory) && defined(subsubcategory)]  {
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
  }`);

  return res;
}

export default async function page({
  searchParams,
}: {
  searchParams: { query: string; sort: string; pageSize: number; page: number };
}) {
  const products: Product[] = await searchProducts(searchParams.query);

  return (
    <div className='p-6  text-black '>
      <span className='flex py-4 border-b border-gray-300 gap-4 items-center'>
        <h2 className='text-lg font-medium'>Sökresultat</h2>
      </span>

      <div className='grid grid-cols-3 gap-2'>
        {products.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}
