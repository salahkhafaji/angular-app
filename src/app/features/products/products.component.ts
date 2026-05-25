import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

@Component({ standalone: true, imports: [CommonModule, FormsModule, RouterModule], 
  selector: 'app-products',
  template: `
    <div class="container mt-4">
      <div class="row">
        <div class="col-md-3">
          <div class="card">
            <div class="card-header">Filters</div>
            <div class="card-body">
              <input type="text" [(ngModel)]="searchTerm" (input)="search()" class="form-control mb-2" placeholder="Search...">
              <select [(ngModel)]="selectedCategory" (change)="filter()" class="form-control mb-2">
                <option value="">All Categories</option>
                <option *ngFor="let cat of categories" [value]="cat">{{cat}}</option>
              </select>
              <input type="number" [(ngModel)]="minPrice" placeholder="Min Price" class="form-control mb-2">
              <input type="number" [(ngModel)]="maxPrice" placeholder="Max Price" class="form-control mb-2">
              <button (click)="filter()" class="btn btn-primary w-100">Apply Filters</button>
            </div>
          </div>
        </div>
        <div class="col-md-9">
          <div class="row">
            <div class="col-md-4 mb-4" *ngFor="let product of filteredProducts">
              <div class="card">
                <img [src]="product.imageUrl" class="card-img-top" alt="Product">
                <div class="card-body">
                  <h5 class="card-title">{{product.name}}</h5>
                  <p class="card-text">\$ {{product.price}}</p>
                  <p class="text-muted">Stock: {{product.stock}}</p>
                  <a [routerLink]="['/products', product.id]" class="btn btn-info btn-sm">View</a>
                  <button (click)="addToCart(product)" class="btn btn-primary btn-sm ms-2">Add to Cart</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  categories: string[] = [];
  searchTerm = '';
  selectedCategory = '';
  minPrice = 0;
  maxPrice = 10000;

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
      this.filteredProducts = products;
    });
    this.productService.getCategories().subscribe(cats => {
      this.categories = cats;
    });
  }

  search() {
    this.productService.searchProducts(this.searchTerm).subscribe(products => {
      this.filteredProducts = products;
    });
  }

  filter() {
    const filters = {
      search: this.searchTerm,
      category: this.selectedCategory,
      minPrice: this.minPrice,
      maxPrice: this.maxPrice
    };
    this.productService.filterProducts(filters).subscribe(products => {
      this.filteredProducts = products;
    });
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
    alert('Added to cart!');
  }
}
