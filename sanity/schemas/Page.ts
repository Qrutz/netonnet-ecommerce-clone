import { defineField, defineType } from 'sanity';

export default defineType({
  // create the schema for a page
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),

    defineField({
      name: 'heroSection',
      title: 'Hero Section',
      type: 'heroSection',
    }),

    defineField({
      name: 'promotionSection',
      title: 'Promotion Section',
      type: 'promotionSection',
    }),

    defineField({
      name: 'FeaturedProductsSection',
      title: 'Featured Products Section',
      type: 'promotionSection',
    }),

    defineField({
      name: 'adBoxes',
      title: 'Ad Boxes',
      type: 'array',
      of: [{ type: 'adBox' }],
    }),
  ],
});
