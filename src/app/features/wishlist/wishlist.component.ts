import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../../services/wishlist.service';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  selector: 'app-wishlist',
  template: `
    <div class="container mt-4">
      <h2>My Wishlist</h2>
      <div class="row">
        <div class="col-md-3 mb-4" *ngFor="let item of wishlistItems">
          <div class="card">
            <div class="card-body">
              <h5>{{item.product.name}}</h5>
              <p>\$ {{item.product.price}}</p>
              <button (click)="remove(item.productId)" class="btn btn-danger btn-sm">Remove</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class WishlistComponent implements OnInit {
  wishlistItems: any[] = [];

  constructor(private wishlistService: WishlistService) {}

  ngOnInit() {
    this.wishlistService.wishlist$.subscribe(items => {
      this.wishlistItems = items;
    });
  }

  remove(productId: number) {
    this.wishlistService.removeFromWishlist(productId);
  }
}
