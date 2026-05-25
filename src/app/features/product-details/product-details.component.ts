import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { WishlistService } from '../../services/wishlist.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="container mt-4" *ngIf="product">
      <div class="row">
        <div class="col-md-6">
          <img [src]="product.imageUrl" class="img-fluid rounded shadow" alt="{{product.name}}" style="width:100%">
        </div>
        <div class="col-md-6">
          <h2>{{product.name}}</h2>
          <p class="text-muted">{{product.category}}</p>
          <h3 class="text-primary">\${{product.price}}</h3>
          <p>{{product.description}}</p>
          <p><strong>Stock:</strong> {{product.stock}} units</p>
          <div class="mb-3">
            <label>Quantity:</label>
            <input type="number" class="form-control w-25" [(ngModel)]="quantity" name="quantity" min="1" [max]="product.stock">
          </div>
          <button (click)="addToCart()" class="btn btn-primary">Add to Cart</button>
          <button (click)="addToWishlist()" class="btn btn-outline-danger ms-2">Add to Wishlist</button>
          <a routerLink="/products" class="btn btn-secondary ms-2">Back to Products</a>
        </div>
      </div>
    </div>
    <div class="container mt-4" *ngIf="!product">
      <div class="alert alert-info">Loading product details...</div>
    </div>
  `
})
export class ProductDetailsComponent implements OnInit {
  product: any;
  quantity = 1;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private wishlistService: WishlistService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.productService.getProduct(id).subscribe({
        next: (product) => {
          this.product = product;
        },
        error: (err) => {
          console.error('Error:', err);
          alert('Product not found!');
        }
      });
    }
  }

  addToCart() {
    this.cartService.addToCart(this.product, this.quantity);
    alert('Added to cart!');
  }

  addToWishlist() {
    this.wishlistService.addToWishlist(this.product);
    alert('Added to wishlist!');
  }
}
