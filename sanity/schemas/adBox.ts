import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'adBox',
  title: 'Ad Box',
  type: 'object',
  fields: [
    defineField({
      name: 'Link',
      title: 'Link',
      type: 'string',
    }),
    defineField({
      name: 'Image',
      title: 'Image',
      type: 'image',
    }),
  ],
});
