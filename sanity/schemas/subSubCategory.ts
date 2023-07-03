import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'subSubCategory',
  title: 'SubSubCategory',
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
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'fields',
      title: 'Fields',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'parenCategory',
      title: 'Parent Category',
      type: 'reference',
      to: [{ type: 'subCategory' }],

      options: {
        filter: '!defined(parentCategory)',
      },
    }),

    defineField({
      name: 'grandparentCategory',
      title: 'Grandparent Category',
      type: 'reference',
      to: [{ type: 'category' }],
      options: {
        filter: '!defined(parentCategory)',
      },
    }),
  ],
});
