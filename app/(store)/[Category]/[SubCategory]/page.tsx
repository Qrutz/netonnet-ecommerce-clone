import { Suspense } from 'react';
import Loading from '../loading';
import FilterProductsComponent from '@/components/FilterProductsComponent';
import { client, clientFetch } from '@/sanity/lib/client';
import Products from '@/components/Products';
import {
  getLastKey,
  parseSortString,
} from '@/utils/parserFunctions/CategoryProductParsers';

async function getTotalProducts(categoryHref: string) {
  const data = await clientFetch(
    `count(*[_type == "product" && subcategory->href == "${categoryHref}"])`
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
    await client.fetch(`*[_type == "product" && subcategory->href == "${categoryHref}"] | order(${sortedBy}) [0...${pageSize}] {
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
  params: { SubCategory: string };
  searchParams: { sort: string; pageSize: number; page: number };
}) {
  const products = getCategoryProducts(
    params.SubCategory,
    searchParams.pageSize || 3,
    parseSortString(searchParams.sort)
  ) as Promise<Product[]>;
  const totalProducts = getTotalProducts(params.SubCategory) as Promise<number>;

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
          subCategoryHref={params.SubCategory}
          InitialLastKey={getLastKey(productsData, searchParams.sort)}
        />
      </Suspense>
    </FilterProductsComponent>
  );
}
