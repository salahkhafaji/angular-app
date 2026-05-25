export interface CartItem {
  productId: number;
  quantity: number;
  price: number;
  name: string;
  imageUrl: string;
}

export interface Cart {
  userId: number;
  items: CartItem[];
  total: number;
}
