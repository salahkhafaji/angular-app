import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';

@Component({ standalone: true, imports: [CommonModule, FormsModule], 
  selector: 'app-orders',
  template: `
    <div class="container mt-4">
      <h2>Order Management</h2>
      <table class="table">
        <thead>
          <tr><th>Order ID</th><th>Total</th><th>Status</th><th>Actions</th></tr>
        </thead>
        <tbody>
          <tr *ngFor="let order of orders">
            <td>{{order.id}}</td><td>$ {{order.total}}</td><td>{{order.status}}</td>
            <td>
              <select (change)="updateStatus(order.id, $event)">
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `
})
export class OrdersComponent implements OnInit {
  orders: any[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.adminService.getAllOrders().subscribe(orders => this.orders = orders);
  }

  updateStatus(orderId: number, event: any) {
    this.adminService.updateOrderStatus(orderId, event.target.value).subscribe();
  }
}
