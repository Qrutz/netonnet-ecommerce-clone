import FilterProductsComponent from '@/components/FilterProductsComponent';
import ProductsList from '@/components/ProductsList';
import { Suspense } from 'react';
import Loading from './loading';
import LoadingCategories from '@/components/LoadingCategories';
import { client } from '@/sanity/lib/client';

async function getTotalProducts(categoryHref: string) {
  const data = await client.fetch(
    `count(*[_type == "product" && Category->href == "${categoryHref}"])`
  );

  return data;
}

export default async function page({
  params,
  searchParams,
}: {
  params: { Category: string };
  searchParams: { sort: string; pageSize: number; page: number };
}) {
  const totalProducts = await getTotalProducts(params.Category);

  return (
    <FilterProductsComponent total={totalProducts}>
      <Suspense fallback={<LoadingCategories />}>
        {/* @ts-ignore */}
        <ProductsList
          pageSize={searchParams.pageSize || 3}
          sortedBy={searchParams.sort}
          categoryHref={params.Category}
          totalProducts={totalProducts}
        />
      </Suspense>
    </FilterProductsComponent>
  );
}
