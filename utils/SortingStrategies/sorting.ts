interface SortStrategies {
  [key: string]: (products: Product[]) => Product[];
}

const sortStrategies: SortStrategies = {
  price: (products: Product[]) => {
    return products.sort((a, b) => {
      if (a.details.price > b.details.price) {
        return 1;
      } else {
        return -1;
      }
    });
  },
  name: (products: Product[]) => {
    return products.sort((a, b) => {
      if (a.CardName > b.CardName) {
        return 1;
      } else {
        return -1;
      }
    });
  },
};
