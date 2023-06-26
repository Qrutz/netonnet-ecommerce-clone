import { type } from 'os';
import { of } from 'rxjs';
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'Label',
  title: 'Label',
  type: 'document',
  fields: [
    defineField({
      name: 'message',
      type: 'string',
      title: 'Promotional message',
    }),
    defineField({
      name: 'link',
      type: 'string',
      title: 'Link',
    }),

    defineField({
      name: 'type',
      type: 'string',
      options: {
        list: [
          { title: 'Promotional', value: 'promotional' },
          { title: 'Warning', value: 'warning' },
        ],
      },
    }),
  ],
});
