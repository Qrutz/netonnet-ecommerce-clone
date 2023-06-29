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
interface Category {
  title: string;
  description?: string;
  subCategories: {
    title: string;
    href: string;
  }[];
}

interface SubCategory {
  title: string;
  description?: string;
}

interface NavigationItem {
  title: string;
  description?: string;
  href: string;
  filters?: {
    title: string;
    href: string;
  }[];
}

interface NavigationMenuItems {
  title: string;
  description?: string;
  href: string;
  items: NavigationItem[];
}