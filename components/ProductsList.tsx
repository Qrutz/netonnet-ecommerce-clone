import {
  getProductsByCategory,
  getProductsBySubCategory,
  testing,
} from '@/sanity/helpers/queries';
import { client } from '@/sanity/lib/client';
import React, { Suspense } from 'react';
import ProductSkeleton from './ProductSkeleton';
import RatingComponent from './RatingComponent';
import PaginationButton from './PaginationButton';
import Product from './Product';
import Products from './Products';

async function getCategoryProducts(
  categoryHref: string,
  pageSize: number,
  sortedBy: string
) {
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

  return data;
}

async function getProducts2(categoryHref: string) {
  console.log('getting sub products');
  const data = await client.fetch(getProductsBySubCategory(categoryHref));

  // create an artifical delay

  return data;
}

export default async function ProductsList({
  categoryHref,
  isSub,
  sortedBy,
  pageSize,
  totalProducts,
}: {
  categoryHref: string;
  isSub?: boolean;
  sortedBy: string;
  pageSize: number;
  totalProducts: number;
}) {
  // check if isSub is true, if so only get products from subcategory
  const InitialProducts = isSub
    ? await getProducts2(categoryHref)
    : await getCategoryProducts(
        categoryHref,
        pageSize,
        parseSortString(sortedBy)
      );

  return (
    <Products
      sortedBy={sortedBy}
      totalProducts={totalProducts}
      initialProducts={InitialProducts}
    />
  );
}
function parseSortString(sortedBy?: string) {
  // if sortedBy is null, return _id
  if (!sortedBy) return '_id asc';
  if (sortedBy === '') return '_id asc';

  // parse price_asc into details.price asc
  if (sortedBy === 'price_asc') return 'details.price asc';
  if (sortedBy === 'price_desc') return 'details.price desc';
  if (sortedBy === 'name_asc') return 'title asc';
  if (sortedBy === 'name_desc') return 'title desc';
}
