import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Component } from '@angular/core';

@Component({ standalone: true, imports: [CommonModule, FormsModule], 
  selector: 'app-dashboard',
  template: `
    <div class="container mt-4">
      <h2>Admin Dashboard</h2>
      <div class="row">
        <div class="col-md-4">
          <div class="card text-white bg-primary mb-3">
            <div class="card-body">
              <h5>User Management</h5>
              <a routerLink="/admin/users" class="btn btn-light">Manage Users</a>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card text-white bg-success mb-3">
            <div class="card-body">
              <h5>Product Management</h5>
              <a routerLink="/admin/products" class="btn btn-light">Manage Products</a>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card text-white bg-info mb-3">
            <div class="card-body">
              <h5>Order Management</h5>
              <a routerLink="/admin/orders" class="btn btn-light">Manage Orders</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class DashboardComponent {}
