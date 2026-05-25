import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { RouterLink } from "@angular/router";

@Component({ standalone: true, imports: [CommonModule, FormsModule, RouterLink], 
  selector: 'app-home',
  template: `
    <div class="container mt-4">
      <div class="jumbotron bg-light p-5 rounded">
        <h1>Welcome to E-Commerce Store</h1>
        <p>Your one-stop shop for everything!</p>
      </div>
      <h3 class="mt-4">Featured Products</h3>
      <div class="row">
        <div class="col-md-3 mb-4" *ngFor="let product of featuredProducts">
          <div class="card">
            <img [src]="product.imageUrl" class="card-img-top" alt="Product">
            <div class="card-body">
              <h5 class="card-title">{{product.name}}</h5>
              <p class="card-text">{{product.price}}</p>
              <a [routerLink]="['/products', product.id]" class="btn btn-primary">View Details</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class HomeComponent implements OnInit {
  featuredProducts: any[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getProducts().subscribe(products => {
      this.featuredProducts = products.slice(0, 4);
    });
  }
}
