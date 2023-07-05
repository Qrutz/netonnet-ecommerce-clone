import LargeProjectCard from '@/components/LargeProjectCard';
import RatingComponent from '@/components/RatingComponent';
import { client, clientFetch } from '@/sanity/lib/client';
import { Rating } from '@mui/material';
import React, { Suspense } from 'react';
import Loading from './loading';

async function getProductBySlug(slug: string) {
  console.log('getting product');
  const data = await clientFetch(
    `*[_type == "product" && slug.current == "${slug}"][0] {
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
    }`
  );

  return data as Product;
}

export default async function page({
  params,
}: {
  params: { Product: string };
}) {
  const product = await getProductBySlug(params.Product);

  return (
    <Suspense fallback={<Loading />}>
      <LargeProjectCard product={product} />;
    </Suspense>
  );
}
