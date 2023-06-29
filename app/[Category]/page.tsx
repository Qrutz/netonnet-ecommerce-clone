import ProductSkeleton from '@/components/ProductSkeleton';
import ProductsList from '@/components/ProductsList';
import RatingComponent from '@/components/RatingComponent';
import { getProductsByCategory } from '@/sanity/helpers/queries';
import { client } from '@/sanity/lib/client';
import React, { Suspense } from 'react';

export default function page({ params }: { params: { Category: string } }) {
  return (
    <div className='flex flex-col '>
      <ProductsList params={params.Category} />
    </div>
  );
}
