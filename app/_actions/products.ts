'use server';

import { client, clientFetch } from '@/sanity/lib/client';
import { z } from 'zod';

export async function getProductsByCategoryNameAction(name: string) {
  const query = `*[_type == "product" && Category->href == "${name}"]{ 
    title,
    CardName,
    bulletPoints[],
    Images[]{ _key, asset->{url}},
    ArtikelNummer,
    details,
   }`;

  const products = await clientFetch(query);
  return products;
}

export async function getProductsBySubCategoryNameAction(name: string) {
  const query = `*[_type == "product" && subcategory->href == "${name}"]{ 
    title,
    CardName,
    bulletPoints[],
    Images[]{ _key, asset->{url}},
    ArtikelNummer,
    details,
   }`;

  const products = await client.fetch(query);
  return products;
}
