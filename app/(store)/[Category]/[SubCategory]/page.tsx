import ProductsList from '@/components/ProductsList';
import { Suspense } from 'react';
import Loading from '../loading';
import FilterProductsComponent from '@/components/FilterProductsComponent';
import LoadingCategories from '@/components/LoadingCategories';

export default function page({ params }: { params: { SubCategory: string } }) {
  return (
    <div className='flex flex-col grap-4 '>
      <FilterProductsComponent>
        <Suspense fallback={<LoadingCategories />}>
          {/* @ts-ignore */}
          <ProductsList isSub={true} params={params.SubCategory} />;
        </Suspense>
      </FilterProductsComponent>
    </div>
  );
}
