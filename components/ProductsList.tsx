import {
  getProductsByCategory,
  getProductsBySubCategory,
  testing,
} from '@/sanity/helpers/queries';
import { client } from '@/sanity/lib/client';
import React, { Suspense } from 'react';
import ProductSkeleton from './ProductSkeleton';
import RatingComponent from './RatingComponent';
import PaginationButton from './PaginationButton';

async function getCategoryProducts(
  categoryHref: string,
  pageSize: number,
  lastId?: string
) {
  console.log('getting products');
  const data =
    await client.fetch(`*[_type == "product" && Category->href == "${categoryHref}" && _id > "${lastId}"] | order(_createdAt desc) [0...${pageSize}] {
      _id,
      title,
      CardName,
      bulletPoints[],
      Images[]{_key, asset->{url}},
      ArtikelNummer,
      details
    }`);

  return data;
}

async function getProducts2(categoryHref: string) {
  console.log('getting sub products');
  const data = await client.fetch(getProductsBySubCategory(categoryHref));

  // create an artifical delay

  return data;
}

export default async function ProductsList({
  categoryHref,
  isSub,
  sortedBy,
  pageSize,
  page,
}: {
  categoryHref: string;
  isSub?: boolean;
  sortedBy?: keyof SortStrategies | null;
  pageSize: number;
  page: number;
}) {
  // check if isSub is true, if so only get products from subcategory
  const products: Product[] = isSub
    ? await getProducts2(categoryHref)
    : await getCategoryProducts(categoryHref, pageSize, '');

  // const pageSize = 6;

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
