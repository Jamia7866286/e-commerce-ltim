export interface Product {
    id: number;
    category: string;
    price: number;
    rating: {
      count: number;
      rate: number;
    };
    title: string;
    image: string;
    description: string;
  }