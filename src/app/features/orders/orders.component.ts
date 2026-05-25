import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';

@Component({ standalone: true, imports: [CommonModule, FormsModule], 
  selector: 'app-orders',
  template: `
    <div class="container mt-4">
      <h2>My Orders</h2>
      <div class="card mb-3" *ngFor="let order of orders">
        <div class="card-body">
          <h5>Order #{{order.id}}</h5>
          <p>Date: {{order.createdAt | date}}</p>
          <p>Status: {{order.status}}</p>
          <p>Total: \$ {{order.total}}</p>
        </div>
      </div>
    </div>
  `
})
export class OrdersComponent implements OnInit {
  orders: any[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.orderService.getUserOrders().subscribe(orders => {
      this.orders = orders;
    });
  }
}
