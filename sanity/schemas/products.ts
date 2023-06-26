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
    { name: 'ArtikelNummer', title: 'Artikelnummer', type: 'string' },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 200,
        slugify: (input) =>
          input.toLowerCase().replace(/\s+/g, '-').slice(0, 200),
      },
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
