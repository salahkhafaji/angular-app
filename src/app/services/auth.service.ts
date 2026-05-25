import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = environment.apiUrl;
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  login(email: string, password: string): Observable<any> {
    // Find user by email and password
    return this.http.get<any[]>(`${this.apiUrl}/users?email=${email}&password=${password}`).pipe(
      map(users => {
        if (users && users.length > 0) {
          const user = users[0];
          const token = `fake-jwt-token-${user.id}-${user.role}`;
          localStorage.setItem('currentUser', JSON.stringify(user));
          localStorage.setItem('token', token);
          this.currentUserSubject.next(user);
          return { success: true, user: user, token: token };
        } else {
          return { success: false, message: 'Invalid credentials' };
        }
      })
    );
  }

  register(userData: any): Observable<any> {
    userData.id = Date.now();
    userData.createdAt = new Date().toISOString();
    return this.http.post(`${this.apiUrl}/users`, userData).pipe(
      map(user => ({ success: true, user: user }))
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getCurrentUser(): any {
    return this.currentUserSubject.value;
  }

  hasRole(role: string): boolean {
    const user = this.getCurrentUser();
    return !!(user && user.role === role);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  updateProfile(userData: any): Observable<any> {
    const user = this.getCurrentUser();
    return this.http.put(`${this.apiUrl}/users/${user?.id}`, userData).pipe(
      tap((updatedUser) => {
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        this.currentUserSubject.next(updatedUser);
      })
    );
  }
}
