import FilterProductsComponent from '@/components/FilterProductsComponent';
import ProductsList from '@/components/ProductsList';
import { Suspense } from 'react';
import Loading from './loading';
import LoadingCategories from '@/components/LoadingCategories';

export default function page({
  params,
  searchParams,
}: {
  params: { Category: string };
  searchParams: { sort: string };
}) {
  return (
    <div className='flex flex-col gap-4 '>
      <FilterProductsComponent />

      <Suspense fallback={<LoadingCategories />}>
        {/* @ts-ignore */}
        <ProductsList sortedBy={searchParams.sort} params={params.Category} />
      </Suspense>
    </div>
  );
}
