import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card">
            <div class="card-header"><h3>Register</h3></div>
            <div class="card-body">
              <form (ngSubmit)="onSubmit()">
                <div class="mb-3">
                  <label>Name</label>
                  <input type="text" [(ngModel)]="user.name" class="form-control" required>
                </div>
                <div class="mb-3">
                  <label>Email</label>
                  <input type="email" [(ngModel)]="user.email" class="form-control" required>
                </div>
                <div class="mb-3">
                  <label>Phone</label>
                  <input type="text" [(ngModel)]="user.phone" class="form-control" required>
                </div>
                <div class="mb-3">
                  <label>Address</label>
                  <textarea [(ngModel)]="user.address" class="form-control" required></textarea>
                </div>
                <div class="mb-3">
                  <label>Password</label>
                  <input type="password" [(ngModel)]="user.password" class="form-control" required>
                </div>
                <div class="mb-3">
                  <label>Role</label>
                  <select [(ngModel)]="user.role" class="form-control">
                    <option value="customer">Customer</option>
                    <option value="seller">Seller</option>
                  </select>
                </div>
                <button type="submit" class="btn btn-primary">Register</button>
                <a routerLink="/login" class="btn btn-link">Already have an account?</a>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class RegisterComponent {
  user = {
    name: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    role: 'customer'
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    this.authService.register(this.user).subscribe({
      next: () => {
        alert('Registration successful! Please login.');
        this.router.navigate(['/login']);
      },
      error: () => {
        alert('Registration failed. Email might already exist.');
      }
    });
  }
}
