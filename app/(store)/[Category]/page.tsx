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
  searchParams: { sort: string; pageSize: number; page: number };
}) {
  return (
    <FilterProductsComponent>
      <Suspense fallback={<LoadingCategories />}>
        {/* @ts-ignore */}
        <ProductsList
          pageSize={searchParams.pageSize || 3}
          sortedBy={searchParams.sort}
          categoryHref={params.Category}
          page={searchParams.page || 1}
        />
      </Suspense>
    </FilterProductsComponent>
  );
}
