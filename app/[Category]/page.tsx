import FilterProductsComponent from '@/components/FilterProductsComponent';
import ProductsList from '@/components/ProductsList';

export default function page({
  params,
  searchParams,
}: {
  params: { Category: string };
  searchParams: { sort: string };
}) {
  return (
    <div className='flex flex-col gap-4 '>
      <FilterProductsComponent />
      <ProductsList sortedBy={searchParams.sort} params={params.Category} />
    </div>
  );
}
