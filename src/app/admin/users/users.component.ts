import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';

@Component({ standalone: true, imports: [CommonModule, FormsModule], 
  selector: 'app-users',
  template: `
    <div class="container mt-4">
      <h2>User Management</h2>
      <table class="table">
        <thead>
          <tr><th>ID</th><th>Name</th><th>Email</th><th>Role</th><th>Actions</th></tr>
        </thead>
        <tbody>
          <tr *ngFor="let user of users">
            <td>{{user.id}}</td><td>{{user.name}}</td><td>{{user.email}}</td><td>{{user.role}}</td>
            <td><button class="btn btn-danger btn-sm" (click)="deleteUser(user.id)">Delete</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  `
})
export class UsersComponent implements OnInit {
  users: any[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.adminService.getAllUsers().subscribe(users => this.users = users);
  }

  deleteUser(id: number) {
    if (confirm('Delete this user?')) {
      this.adminService.deleteUser(id).subscribe(() => {
        this.users = this.users.filter(u => u.id !== id);
      });
    }
  }
}
