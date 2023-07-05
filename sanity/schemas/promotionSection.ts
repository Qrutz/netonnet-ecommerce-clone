import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'promotionSection',
  title: 'promotionSection',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'carousel',
      title: 'Carousel',
      type: 'array',

      // of references to proudct type
      of: [
        {
          type: 'reference',

          to: [
            {
              type: 'product',
            },
          ],
        },
      ],
    }),
  ],
});
