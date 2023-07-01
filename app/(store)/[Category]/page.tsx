import FilterProductsComponent from '@/components/FilterProductsComponent';

import { Suspense } from 'react';
import Loading from './loading';
import { client } from '@/sanity/lib/client';
import Products from '@/components/Products';
import {
  getLastKey,
  parseSortString,
} from '@/utils/parserFunctions/CategoryProductParsers';

async function getTotalProducts(categoryHref: string) {
  const data = await client.fetch(
    `count(*[_type == "product" && Category->href == "${categoryHref}"])`
  );

  return data as number;
}

async function getCategoryProducts(
  categoryHref: string,
  pageSize: number,
  sortedBy: string
) {
  console.log('getting products');
  const data =
    await client.fetch(`*[_type == "product" && Category->href == "${categoryHref}"] | order(${sortedBy}) [0...${pageSize}] {
      _id,
      title,
      CardName,
      bulletPoints[],
      Images[]{_key, asset->{url}},
      ArtikelNummer,
      details
    }`);

  return data as Product[];
}

export default async function page({
  params,
  searchParams,
}: {
  params: { Category: string };
  searchParams: { sort: string; pageSize: number; page: number };
}) {
  const products = getCategoryProducts(
    params.Category,
    searchParams.pageSize || 3,
    parseSortString(searchParams.sort)
  ) as Promise<Product[]>;
  const totalProducts = getTotalProducts(params.Category) as Promise<number>;

  const [productsData, totalProductsData] = await Promise.all([
    products,
    totalProducts,
  ]);

  return (
    <FilterProductsComponent total={totalProductsData}>
      <Suspense fallback={<Loading />}>
        <Products
          sortedBy={searchParams.sort}
          totalProducts={totalProductsData}
          initialProducts={productsData}
          pageSize={searchParams.pageSize || 3}
          categoryHref={params.Category}
          InitialLastKey={getLastKey(productsData, searchParams.sort)}
        />
      </Suspense>
    </FilterProductsComponent>
  );
}
