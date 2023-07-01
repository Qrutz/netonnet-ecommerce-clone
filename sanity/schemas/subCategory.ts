import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'subCategory',
  title: 'SubCategory',
  type: 'document',
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
      name: 'href',
      title: 'href',
      type: 'string',
    }),

    defineField({
      name: 'parent',
      title: 'Parent Category',
      type: 'reference',
      to: [{ type: 'category' }],

      options: {
        filter: '!defined(parentCategory)',
      },
    }),
  ],
});
