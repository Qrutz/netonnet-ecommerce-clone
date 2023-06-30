import React from 'react';
import ProductSkeleton from './ProductSkeleton';

export default function LoadingCategories() {
  return (
    // map over productskeleton in a grid of 3 with 2 rows
    <div className='grid grid-cols-3 gap-5'>
      <ProductSkeleton />
      <ProductSkeleton />
      <ProductSkeleton />
      <ProductSkeleton />
      <ProductSkeleton />
      <ProductSkeleton />
    </div>
  );
}
