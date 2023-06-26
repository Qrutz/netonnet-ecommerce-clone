import { type SchemaTypeDefinition } from 'sanity';

import blockContent from './schemas/blockContent';
import category from './schemas/category';
import post from './schemas/post';
import author from './schemas/author';
import Label from './schemas/PromotionBanner';
import Page from './schemas/Page';
import heroSection from './schemas/heroSection';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, Label, author, category, Page, heroSection, blockContent],
};
