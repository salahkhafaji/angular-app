export interface Order {
  id: number;
  userId: number;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: string;
  paymentMethod: string;
  createdAt: string;
  trackingNumber?: string;
}

export interface OrderItem {
  productId: number;
  quantity: number;
  price: number;
  name: string;
}
