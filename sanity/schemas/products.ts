export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    { name: 'CardName', title: 'CardName', type: 'string' },
    { name: 'ArtikelNummer', title: 'Artikelnummer', type: 'string' },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 200,
        slugify: (input: string) =>
          input.toLowerCase().replace(/\s+/g, '-').slice(0, 200),
      },
    },
    // need a field for a list of bullet points, max 5
    {
      name: 'bulletPoints',
      title: 'Bullet Points',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'Images',
      title: 'Images',
      type: 'array',
      of: [{ type: 'image' }],
    },
    {
      name: 'Category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
    },
    {
      name: 'subcategory',
      title: 'Subcategory',
      type: 'reference',
      to: [{ type: 'subCategory' }],
    },
    {
      name: 'details',
      title: 'Product Details',
      type: 'object',
      fields: [
        {
          name: 'price',
          title: 'Price',
          type: 'number',
        },
        {
          name: 'description',
          title: 'Description',
          type: 'text',
        },
        // Add more fields for specific product details
      ],
    },
    // Add more fields common to all products if needed
  ],
};
