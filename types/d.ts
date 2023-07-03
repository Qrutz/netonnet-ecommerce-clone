interface Product {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  Category: {
    slug: {
      current: string;
    };
  };
  subcategory: {
    slug: {
      current: string;
    };
  };
  subsubcategory: {
    slug: {
      current: string;
    };
  };
  CardName: string;
  bulletPoints: string[];
  ArtikelNummer: string;
  Images: {
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

type SortOptions = 'price_asc' | 'price_desc' | 'name_asc' | 'name_desc' | '';
