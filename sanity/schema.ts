import { type SchemaTypeDefinition } from 'sanity';

import blockContent from './schemas/blockContent';
import category from './schemas/category';
import post from './schemas/post';
import author from './schemas/author';
import Label from './schemas/PromotionBanner';
import Page from './schemas/Page';
import heroSection from './schemas/heroSection';
import subCategory from './schemas/subCategory';
import products from './schemas/products';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    Label,

    category,
    subCategory,
    products,
    Page,
    heroSection,
    blockContent,
  ],
};
