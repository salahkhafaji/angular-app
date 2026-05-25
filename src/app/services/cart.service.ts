import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../models/cart.model';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class CartService {
  public cartSubject = new BehaviorSubject<CartItem[]>([]); // Changed to public
  public cart$ = this.cartSubject.asObservable();

  constructor(private authService: AuthService) {
    this.loadCart();
  }

  private loadCart(): void {
    const storedCart = localStorage.getItem(`cart_${this.authService.getCurrentUser()?.id || 'guest'}`);
    if (storedCart) {
      this.cartSubject.next(JSON.parse(storedCart));
    }
  }

  private saveCart(items: CartItem[]): void {
    const userId = this.authService.getCurrentUser()?.id || 'guest';
    localStorage.setItem(`cart_${userId}`, JSON.stringify(items));
    this.cartSubject.next(items);
  }

  addToCart(product: any, quantity: number = 1): void {
    const currentItems = this.cartSubject.value;
    const existingItem = currentItems.find(item => item.productId === product.id);
    
    if (existingItem) {
      existingItem.quantity += quantity;
      this.saveCart([...currentItems]);
    } else {
      const newItem: CartItem = {
        productId: product.id,
        quantity: quantity,
        price: product.price,
        name: product.name,
        imageUrl: product.imageUrl
      };
      this.saveCart([...currentItems, newItem]);
    }
  }

  removeFromCart(productId: number): void {
    const currentItems = this.cartSubject.value;
    const filtered = currentItems.filter(item => item.productId !== productId);
    this.saveCart(filtered);
  }

  updateQuantity(productId: number, quantity: number): void {
    const currentItems = this.cartSubject.value;
    const item = currentItems.find(item => item.productId === productId);
    if (item && quantity > 0) {
      item.quantity = quantity;
      this.saveCart([...currentItems]);
    } else if (quantity === 0) {
      this.removeFromCart(productId);
    }
  }

  getCartTotal(): number {
    return this.cartSubject.value.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  getCartCount(): number {
    return this.cartSubject.value.reduce((count, item) => count + item.quantity, 0);
  }

  clearCart(): void {
    this.saveCart([]);
  }
}
