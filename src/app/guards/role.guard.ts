import { inject } from '@angular/core';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const roleGuard = (route: ActivatedRouteSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const expectedRoles = route.data['roles'] as Array<string>;
  const user = authService.getCurrentUser();
  
  if (user && expectedRoles.includes(user.role)) {
    return true;
  }
  
  router.navigate(['/']);
  return false;
};
