import React from 'react';
import { useParams, useSelectedLayoutSegment } from 'next/navigation';
import ProductsList from '@/components/ProductsList';

export default function page({ params }: { params: { SubCategory: string } }) {
  return <ProductsList isSub={true} params={params.SubCategory} />;
}
