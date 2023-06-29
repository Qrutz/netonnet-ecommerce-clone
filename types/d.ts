interface Product {
  title: string;
  CardName: string;
  bulletPoints: string[];
  ArtikelNummer: string;
  Images?: {
    asset: {
      _key: string;
      url: string;
    };
  }[];

  details: {
    description?: string;
    price: number;
  };
}

interface labelType {
  message: string;
  type: string;
  link: string;
}
