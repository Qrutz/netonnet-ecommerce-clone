import { Suspense } from 'react';
import Loading from '../loading';
import FilterProductsComponent from '@/components/FilterProductsComponent';
import LoadingCategories from '@/components/LoadingCategories';
import { client } from '@/sanity/lib/client';
import Products from '@/components/Products';

async function getTotalProducts(categoryHref: string) {
  const data = await client.fetch(
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

  console.log(searchParams.sort, params.SubCategory);

  return (
    <FilterProductsComponent total={totalProductsData}>
      <Products
        sortedBy={searchParams.sort}
        totalProducts={totalProductsData}
        initialProducts={productsData}
        pageSize={searchParams.pageSize || 3}
        subCategoryHref={params.SubCategory}
        InitialLastKey={getLastKey(productsData, searchParams.sort)}
        isSubCategory={true}
      />
    </FilterProductsComponent>
  );
}

function getLastKey(products: Product[], sortedBy: string) {
  const lastKey = products[products.length - 1];
  if (sortedBy === 'price_asc') return lastKey.details.price;
  if (sortedBy === 'price_desc') return lastKey.details.price;
  if (sortedBy === 'name_asc') return lastKey.title;
  if (sortedBy === 'name_desc') return lastKey.title;
  else return lastKey._id;
}

function parseSortString(sortedBy: string) {
  // if sortedBy is null, return _id
  if (sortedBy === '') return '_id asc';

  // parse price_asc into details.price asc
  if (sortedBy === 'price_asc') return 'details.price asc';
  if (sortedBy === 'price_desc') return 'details.price desc';
  if (sortedBy === 'name_asc') return 'title asc';
  if (sortedBy === 'name_desc') return 'title desc';
  else return '_id asc';
}
