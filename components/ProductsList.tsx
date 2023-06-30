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
  lastId?: string
) {
  console.log('getting products');
  const data =
    await client.fetch(`*[_type == "product" && Category->href == "${categoryHref}"] | order(_id asc) [0...${pageSize}] {
      _id,
      title,
      CardName,
      bulletPoints[],
      Images[]{_key, asset->{url}},
      ArtikelNummer,
      details
    }`);

  const total = await client.fetch(
    `count(*[_type == "product" && Category->href == "${categoryHref}"])`
  );

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
  page,
}: {
  categoryHref: string;
  isSub?: boolean;
  sortedBy?: keyof SortStrategies | null;
  pageSize: number;
  page: number;
}) {
  // check if isSub is true, if so only get products from subcategory
  const InitialProducts = isSub
    ? await getProducts2(categoryHref)
    : await getCategoryProducts(categoryHref, pageSize, '');

  return <Products initialProducts={InitialProducts} />;
}
