import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Order } from '../models/order.model';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private authService: AuthService) {}

  createOrder(orderData: any): Observable<Order> {
    orderData.userId = this.authService.getCurrentUser()?.id;
    orderData.createdAt = new Date().toISOString();
    orderData.status = 'pending';
    return this.http.post<Order>(`${this.apiUrl}/orders`, orderData);
  }

  getUserOrders(): Observable<Order[]> {
    const userId = this.authService.getCurrentUser()?.id;
    return this.http.get<Order[]>(`${this.apiUrl}/orders?userId=${userId}`);
  }

  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/orders`);
  }

  getSellerOrders(sellerId: number): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/orders`).pipe(
      // In real app, filter by seller's products
    );
  }

  updateOrderStatus(orderId: number, status: string): Observable<Order> {
    return this.http.patch<Order>(`${this.apiUrl}/orders/${orderId}`, { status });
  }

  getOrderById(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/orders/${id}`);
  }
}
