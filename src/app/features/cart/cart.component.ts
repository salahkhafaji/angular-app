import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({ standalone: true, imports: [CommonModule, FormsModule], 
  selector: 'app-cart',
  template: `
    <div class="container mt-4">
      <h2>Shopping Cart</h2>
      <table class="table" *ngIf="cartItems.length > 0">
        <thead>
          <tr><th>Product</th><th>Price</th><th>Quantity</th><th>Total</th><th></th></tr>
        </thead>
        <tbody>
          <tr *ngFor="let item of cartItems">
            <td>{{item.name}}</td>
            <td>\$ {{item.price}}</td>
            <td><input type="number" [(ngModel)]="item.quantity" (change)="updateQuantity(item)" class="form-control w-25"></td>
            <td>\$ {{item.price * item.quantity}}</td>
            <td><button (click)="removeItem(item.productId)" class="btn btn-danger btn-sm">Remove</button></td>
          </tr>
        </tbody>
        <tfoot>
          <tr><td colspan="3" class="text-end"><strong>Total:</strong></td>
          <td><strong>\$ {{getTotal()}}</strong></td>
          <td></td>
        </tr>
        </tfoot>
      </table>
      <div *ngIf="cartItems.length === 0" class="alert alert-info">Your cart is empty</div>
      <button (click)="checkout()" class="btn btn-success" [disabled]="cartItems.length === 0">Proceed to Checkout</button>
    </div>
  `
})
export class CartComponent {
  cartItems: any[] = [];

  constructor(private cartService: CartService, private router: Router) {
    this.cartService.cart$.subscribe(items => this.cartItems = items);
  }

  updateQuantity(item: any) {
    this.cartService.updateQuantity(item.productId, item.quantity);
  }

  removeItem(productId: number) {
    this.cartService.removeFromCart(productId);
  }

  getTotal(): number {
    return this.cartService.getCartTotal();
  }

  checkout() {
    this.router.navigate(['/checkout']);
  }
}
