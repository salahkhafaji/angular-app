import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';

@Component({ standalone: true, imports: [CommonModule, FormsModule], 
  selector: 'app-products',
  template: `
    <div class="container mt-4">
      <h2>Product Management</h2>
      <table class="table">
        <thead>
          <tr><th>ID</th><th>Name</th><th>Price</th><th>Stock</th><th>Actions</th></tr>
        </thead>
        <tbody>
          <tr *ngFor="let product of products">
            <td>{{product.id}}</td><td>{{product.name}}</td><td>$ {{product.price}}</td><td>{{product.stock}}</td>
            <td><button class="btn btn-danger btn-sm" (click)="deleteProduct(product.id)">Delete</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  `
})
export class ProductsComponent implements OnInit {
  products: any[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.adminService.getAllProducts().subscribe(products => this.products = products);
  }

  deleteProduct(id: number) {
    if (confirm('Delete this product?')) {
      this.adminService.deleteProduct(id).subscribe(() => {
        this.products = this.products.filter(p => p.id !== id);
      });
    }
  }
}
