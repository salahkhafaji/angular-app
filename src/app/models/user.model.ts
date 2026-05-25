export interface User {
  id: number;
  email: string;
  name: string;
  role: 'customer' | 'seller' | 'admin';
  phone: string;
  address: string;
  createdAt: string;
  paymentDetails?: any;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  phone: string;
  address: string;
  role?: string;
}
