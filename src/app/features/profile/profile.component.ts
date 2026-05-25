import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({ standalone: true, imports: [CommonModule, FormsModule], 
  selector: 'app-profile',
  template: `
    <div class="container mt-4">
      <h2>My Profile</h2>
      <div class="card">
        <div class="card-body" *ngIf="user">
          <p><strong>Name:</strong> {{user.name}}</p>
          <p><strong>Email:</strong> {{user.email}}</p>
          <p><strong>Phone:</strong> {{user.phone}}</p>
          <p><strong>Address:</strong> {{user.address}}</p>
          <p><strong>Role:</strong> {{user.role}}</p>
        </div>
      </div>
    </div>
  `
})
export class ProfileComponent implements OnInit {
  user: any;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.user = this.authService.getCurrentUser();
  }
}
