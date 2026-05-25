import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Component, OnInit } from '@angular/core';
import { SellerService } from '../../services/seller.service';
import { ProductService } from '../../services/product.service';

@Component({ standalone: true, imports: [CommonModule, FormsModule], 
  selector: 'app-products',
  template: `
    <div class="container mt-4">
      <h2>My Products</h2>
      <button class="btn btn-primary mb-3" data-bs-toggle="modal" data-bs-target="#addProductModal">Add Product</button>
      <table class="table">
        <thead>
          <tr><th>Name</th><th>Price</th><th>Stock</th><th>Actions</th></tr>
        </thead>
        <tbody>
          <tr *ngFor="let product of products">
            <td>{{product.name}}</td><td>$ {{product.price}}</td><td>{{product.stock}}</td>
            <td><button class="btn btn-danger btn-sm" (click)="deleteProduct(product.id)">Delete</button></td>
          </tr>
        </tbody>
      </table>
      
      <!-- Add Product Modal -->
      <div class="modal fade" id="addProductModal" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Add Product</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
              <input [(ngModel)]="newProduct.name" placeholder="Name" class="form-control mb-2">
              <textarea [(ngModel)]="newProduct.description" placeholder="Description" class="form-control mb-2"></textarea>
              <input [(ngModel)]="newProduct.price" type="number" placeholder="Price" class="form-control mb-2">
              <input [(ngModel)]="newProduct.category" placeholder="Category" class="form-control mb-2">
              <input [(ngModel)]="newProduct.stock" type="number" placeholder="Stock" class="form-control mb-2">
              <input [(ngModel)]="newProduct.imageUrl" placeholder="Image URL" class="form-control mb-2">
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" class="btn btn-primary" (click)="addProduct()">Add</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  newProduct: any = {};

  constructor(private sellerService: SellerService, private productService: ProductService) {}

  ngOnInit() {
    this.sellerService.getMyProducts().subscribe(products => this.products = products);
  }

  addProduct() {
    this.productService.createProduct(this.newProduct).subscribe(() => {
      window.location.reload();
    });
  }

  deleteProduct(id: number) {
    if (confirm('Delete this product?')) {
      this.sellerService.deleteProduct(id).subscribe(() => {
        this.products = this.products.filter(p => p.id !== id);
      });
    }
  }
}
