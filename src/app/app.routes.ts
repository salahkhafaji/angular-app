import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { roleGuard } from './guards/role.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent) },
  { path: 'register', loadComponent: () => import('./auth/register/register.component').then(m => m.RegisterComponent) },
  { path: 'home', loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent) },
  { path: 'products', loadComponent: () => import('./features/products/products.component').then(m => m.ProductsComponent) },
  { path: 'products/:id', loadComponent: () => import('./features/product-details/product-details.component').then(m => m.ProductDetailsComponent) },
  { path: 'cart', loadComponent: () => import('./features/cart/cart.component').then(m => m.CartComponent) },
  { path: 'checkout', loadComponent: () => import('./features/checkout/checkout.component').then(m => m.CheckoutComponent), canActivate: [authGuard] },
  { path: 'orders', loadComponent: () => import('./features/orders/orders.component').then(m => m.OrdersComponent), canActivate: [authGuard] },
  { path: 'profile', loadComponent: () => import('./features/profile/profile.component').then(m => m.ProfileComponent), canActivate: [authGuard] },
  { path: 'wishlist', loadComponent: () => import('./features/wishlist/wishlist.component').then(m => m.WishlistComponent), canActivate: [authGuard] },
  { path: 'admin', loadComponent: () => import('./admin/dashboard/dashboard.component').then(m => m.DashboardComponent), canActivate: [authGuard, roleGuard], data: { roles: ['admin'] } },
  { path: 'admin/users', loadComponent: () => import('./admin/users/users.component').then(m => m.UsersComponent), canActivate: [authGuard, roleGuard], data: { roles: ['admin'] } },
  { path: 'admin/products', loadComponent: () => import('./admin/products/products.component').then(m => m.ProductsComponent), canActivate: [authGuard, roleGuard], data: { roles: ['admin'] } },
  { path: 'admin/orders', loadComponent: () => import('./admin/orders/orders.component').then(m => m.OrdersComponent), canActivate: [authGuard, roleGuard], data: { roles: ['admin'] } },
  { path: 'seller', loadComponent: () => import('./seller/dashboard/dashboard.component').then(m => m.DashboardComponent), canActivate: [authGuard, roleGuard], data: { roles: ['seller'] } },
  { path: 'seller/products', loadComponent: () => import('./seller/products/products.component').then(m => m.ProductsComponent), canActivate: [authGuard, roleGuard], data: { roles: ['seller'] } },
  { path: 'seller/orders', loadComponent: () => import('./seller/orders/orders.component').then(m => m.OrdersComponent), canActivate: [authGuard, roleGuard], data: { roles: ['seller'] } },
  { path: 'seller/earnings', loadComponent: () => import('./seller/earnings/earnings.component').then(m => m.EarningsComponent), canActivate: [authGuard, roleGuard], data: { roles: ['seller'] } }
];
