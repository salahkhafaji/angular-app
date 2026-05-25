import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    this.authService.login(this.email, this.password).subscribe({
      next: (res: any) => {
        if (res.success) {
          const user = res.user;
          if (user.role === 'admin') this.router.navigate(['/admin']);
          else if (user.role === 'seller') this.router.navigate(['/seller']);
          else this.router.navigate(['/']);
        } else {
          this.error = 'Invalid credentials';
        }
      },
      error: () => {
        this.error = 'Login failed. Please try again.';
      }
    });
  }
}
