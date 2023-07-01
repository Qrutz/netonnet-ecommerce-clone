import { Suspense } from 'react';
import Loading from '../loading';
import FilterProductsComponent from '@/components/FilterProductsComponent';
import LoadingCategories from '@/components/LoadingCategories';
import { client } from '@/sanity/lib/client';

export default async function page({
  params,
}: {
  params: { SubCategory: string };
}) {
  return <div className='flex flex-col gap-4 '></div>;
}
