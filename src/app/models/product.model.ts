export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  imageUrl: string;
  sellerId: number;
  createdAt: string;
  ratings?: Rating[];
}

export interface Rating {
  userId: number;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Category {
  id: number;
  name: string;
  description: string;
}
