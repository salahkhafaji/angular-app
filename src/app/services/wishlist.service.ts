import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class WishlistService {
  private wishlistSubject = new BehaviorSubject<any[]>([]);
  public wishlist$ = this.wishlistSubject.asObservable();

  constructor(private http: HttpClient, private authService: AuthService) {
    this.loadWishlist();
  }

  private loadWishlist(): void {
    const userId = this.authService.getCurrentUser()?.id;
    if (userId) {
      this.http.get<any[]>(`${environment.apiUrl}/wishlist?userId=${userId}`)
        .subscribe(items => this.wishlistSubject.next(items));
    }
  }

  addToWishlist(product: any): void {
    const userId = this.authService.getCurrentUser()?.id;
    if (userId) {
      const wishlistItem = { userId, productId: product.id, product, addedAt: new Date().toISOString() };
      this.http.post(`${environment.apiUrl}/wishlist`, wishlistItem)
        .subscribe(() => this.loadWishlist());
    }
  }

  removeFromWishlist(productId: number): void {
    const userId = this.authService.getCurrentUser()?.id;
    if (userId) {
      this.http.get<any[]>(`${environment.apiUrl}/wishlist?userId=${userId}&productId=${productId}`)
        .subscribe(items => {
          if (items[0]) {
            this.http.delete(`${environment.apiUrl}/wishlist/${items[0].id}`)
              .subscribe(() => this.loadWishlist());
          }
        });
    }
  }

  isInWishlist(productId: number): boolean {
    return this.wishlistSubject.value.some(item => item.productId === productId);
  }
}
