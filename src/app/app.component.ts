import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule],
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <a class="navbar-brand" routerLink="/">E-Commerce App</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto">
            <li class="nav-item"><a class="nav-link" routerLink="/home">Home</a></li>
            <li class="nav-item"><a class="nav-link" routerLink="/products">Products</a></li>
            <li class="nav-item" *ngIf="isLoggedIn"><a class="nav-link" routerLink="/orders">My Orders</a></li>
            <li class="nav-item" *ngIf="hasRole('seller')"><a class="nav-link" routerLink="/seller">Seller Dashboard</a></li>
            <li class="nav-item" *ngIf="hasRole('admin')"><a class="nav-link" routerLink="/admin">Admin Panel</a></li>
          </ul>
          <ul class="navbar-nav">
            <li class="nav-item" *ngIf="!isLoggedIn"><a class="nav-link" routerLink="/login">Login</a></li>
            <li class="nav-item" *ngIf="!isLoggedIn"><a class="nav-link" routerLink="/register">Register</a></li>
            <li class="nav-item" *ngIf="isLoggedIn"><a class="nav-link" routerLink="/profile">{{userName}}</a></li>
            <li class="nav-item" *ngIf="isLoggedIn"><a class="nav-link" routerLink="/wishlist">❤️ Wishlist</a></li>
            <li class="nav-item"><a class="nav-link" routerLink="/cart">🛒 Cart ({{cartCount}})</a></li>
            <li class="nav-item" *ngIf="isLoggedIn"><a class="nav-link" href="javascript:void(0)" (click)="logout()">Logout</a></li>
          </ul>
        </div>
      </div>
    </nav>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  isLoggedIn = false;
  userName = '';
  cartCount = 0;

  constructor(
    private authService: AuthService,
    private cartService: CartService
  ) {
    this.authService.currentUser$.subscribe(user => {
      this.isLoggedIn = !!user;
      this.userName = user ? user.name : '';
    });
    this.cartService.cart$.subscribe(() => {
      this.cartCount = this.cartService.getCartCount();
    });
  }

  hasRole(role: string): boolean {
    return this.authService.hasRole(role);
  }

  logout() {
    this.authService.logout();
    window.location.href = '/';
  }
}
