import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products`);
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/products/${id}`);
  }

  getProductsBySeller(sellerId: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products?sellerId=${sellerId}`);
  }

  searchProducts(searchTerm: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products?name_like=${searchTerm}`);
  }

  filterProducts(filters: any): Observable<Product[]> {
    let params = new HttpParams();
    if (filters.category) params = params.set('category', filters.category);
    if (filters.minPrice) params = params.set('price_gte', filters.minPrice);
    if (filters.maxPrice) params = params.set('price_lte', filters.maxPrice);
    if (filters.search) params = params.set('name_like', filters.search);
    return this.http.get<Product[]>(`${this.apiUrl}/products`, { params });
  }

  getCategories(): Observable<string[]> {
    return new Observable(observer => {
      this.getProducts().subscribe(products => {
        const categories = [...new Set(products.map(p => p.category))];
        observer.next(categories);
        observer.complete();
      });
    });
  }

  createProduct(product: any): Observable<Product> {
    product.createdAt = new Date().toISOString();
    return this.http.post<Product>(`${this.apiUrl}/products`, product);
  }

  updateProduct(id: number, product: any): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/products/${id}`, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/products/${id}`);
  }
}
