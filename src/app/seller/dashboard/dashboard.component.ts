import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Component } from '@angular/core';

@Component({ standalone: true, imports: [CommonModule, FormsModule], 
  selector: 'app-dashboard',
  template: `
    <div class="container mt-4">
      <h2>Seller Dashboard</h2>
      <div class="row">
        <div class="col-md-4">
          <div class="card bg-info text-white">
            <div class="card-body">
              <h5>Manage Products</h5>
              <a routerLink="/seller/products" class="btn btn-light">Go to Products</a>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card bg-success text-white">
            <div class="card-body">
              <h5>View Orders</h5>
              <a routerLink="/seller/orders" class="btn btn-light">View Orders</a>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card bg-warning text-white">
            <div class="card-body">
              <h5>Earnings</h5>
              <a routerLink="/seller/earnings" class="btn btn-light">View Earnings</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class DashboardComponent {}
