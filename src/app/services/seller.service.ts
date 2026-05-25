import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Product } from '../models/product.model';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class SellerService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private authService: AuthService) {}

  getMyProducts(): Observable<Product[]> {
    const sellerId = this.authService.getCurrentUser()?.id;
    return this.http.get<Product[]>(`${this.apiUrl}/products?sellerId=${sellerId}`);
  }

  createProduct(product: any): Observable<Product> {
    product.sellerId = this.authService.getCurrentUser()?.id;
    product.createdAt = new Date().toISOString();
    return this.http.post<Product>(`${this.apiUrl}/products`, product);
  }

  updateProduct(id: number, product: any): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/products/${id}`, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/products/${id}`);
  }

  updateStock(productId: number, stock: number): Observable<Product> {
    return this.http.patch<Product>(`${this.apiUrl}/products/${productId}`, { stock });
  }

  getEarnings(): Observable<any> {
    // Calculate earnings from orders containing seller's products
    return new Observable(observer => {
      observer.next({ total: 0, pending: 0, paid: 0 });
      observer.complete();
    });
  }
}
