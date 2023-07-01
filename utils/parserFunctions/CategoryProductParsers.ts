export function getLastKey(products: Product[], sortedBy: string) {
  const lastKey = products[products.length - 1];
  if (sortedBy === 'price_asc') return lastKey.details.price;
  if (sortedBy === 'price_desc') return lastKey.details.price;
  if (sortedBy === 'name_asc') return lastKey.title;
  if (sortedBy === 'name_desc') return lastKey.title;
  else return lastKey._id;
}

export function parseSortString(sortedBy: string) {
  // if sortedBy is null, return _id
  if (sortedBy === '') return '_id asc';

  // parse price_asc into details.price asc
  if (sortedBy === 'price_asc') return 'details.price asc';
  if (sortedBy === 'price_desc') return 'details.price desc';
  if (sortedBy === 'name_asc') return 'title asc';
  if (sortedBy === 'name_desc') return 'title desc';
  else return '_id asc';
}
