import { client } from '@/sanity/lib/client';
import React from 'react';

async function getProductBySlug(slug: string) {
  const data = await client.fetch(
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
    <div>
      {product.title} {product.CardName}
    </div>
  );
}
