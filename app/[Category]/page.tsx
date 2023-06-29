import ProductsList from '@/components/ProductsList';

export default function page({ params }: { params: { Category: string } }) {
  return (
    <div className='flex flex-col '>
      <ProductsList params={params.Category} />
    </div>
  );
}
