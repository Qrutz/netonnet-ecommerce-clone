import ProductSkeleton from '@/components/ProductSkeleton';
import ProductsList from '@/components/ProductsList';
import RatingComponent from '@/components/RatingComponent';
import { getProductsByCategory } from '@/sanity/helpers/queries';
import { client } from '@/sanity/lib/client';
import React, { Suspense } from 'react';

async function getProducts(categoryHref: string) {
  const data = await client.fetch(getProductsByCategory(categoryHref));

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

export default async function page({
  params,
}: {
  params: { Category: string };
}) {
  const products: Product[] = await getProducts(params.Category);

  if (!products) {
    return null;
  }

  return (
    <div className='flex flex-col'>
      <h2>Hello header</h2>

      <ProductsList params={params.Category} />
    </div>
  );
}
