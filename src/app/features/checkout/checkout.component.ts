import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { AuthService } from '../../services/auth.service';

@Component({ standalone: true, imports: [CommonModule, FormsModule], 
  selector: 'app-checkout',
  template: `
    <div class="container mt-4">
      <h2>Checkout</h2>
      <div class="row">
        <div class="col-md-8">
          <div class="card mb-3">
            <div class="card-header">Shipping Address</div>
            <div class="card-body">
              <textarea [(ngModel)]="address" class="form-control" rows="3"></textarea>
            </div>
          </div>
          <div class="card">
            <div class="card-header">Payment Method</div>
            <div class="card-body">
              <select [(ngModel)]="paymentMethod" class="form-control">
                <option value="cod">Cash on Delivery</option>
                <option value="credit">Credit Card</option>
              </select>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card">
            <div class="card-header">Order Summary</div>
            <div class="card-body">
              <p>Total Items: {{cartService.getCartCount()}}</p>
              <h5>Total: \$ {{cartService.getCartTotal()}}</h5>
              <button (click)="placeOrder()" class="btn btn-success w-100">Place Order</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class CheckoutComponent {
  address = '';
  paymentMethod = 'cod';

  constructor(
    public cartService: CartService,
    private orderService: OrderService,
    private router: Router
  ) {}

  placeOrder() {
    const order = {
      items: this.cartService.cartSubject.value,
      total: this.cartService.getCartTotal(),
      shippingAddress: this.address,
      paymentMethod: this.paymentMethod
    };
    this.orderService.createOrder(order).subscribe(() => {
      this.cartService.clearCart();
      alert('Order placed successfully!');
      this.router.navigate(['/orders']);
    });
  }
}
