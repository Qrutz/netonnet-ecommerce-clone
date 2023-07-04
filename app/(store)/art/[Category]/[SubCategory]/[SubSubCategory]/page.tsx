import FilterProductsComponent from '@/components/FilterProductsComponent';
import Products from '@/components/Products';
import { client, clientFetch } from '@/sanity/lib/client';
import {
  getLastKey,
  parseSortString,
} from '@/utils/parserFunctions/CategoryProductParsers';
import React, { Suspense } from 'react';
import Loading from '../../loading';

async function getTotalProducts(categoryHref: string) {
  const data = await clientFetch(
    `count(*[_type == "product" && subsubcategory->slug.current == "${categoryHref}"])`
  );

  return data as number;
}

async function getProducts(
  categoryHref: string,
  pageSize: number,
  sortedBy: string
) {
  console.log('getting products');
  const data =
    await client.fetch(`*[_type == "product" && subsubcategory->slug.current == "${categoryHref}"] | order(${sortedBy}) [0...${pageSize}] {
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

  return data as Product[];
}

export default async function page({
  params,
  searchParams,
}: {
  params: { SubSubCategory: string };
  searchParams: { sort: string; pageSize: number; page: number };
}) {
  const products = getProducts(
    params.SubSubCategory,
    searchParams.pageSize || 3,
    parseSortString(searchParams.sort)
  ) as Promise<Product[]>;
  const totalProducts = getTotalProducts(
    params.SubSubCategory
  ) as Promise<number>;

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
          subsubCategoryHref={params.SubSubCategory}
          InitialLastKey={getLastKey(productsData, searchParams.sort)}
        />
      </Suspense>
    </FilterProductsComponent>
  );
}
