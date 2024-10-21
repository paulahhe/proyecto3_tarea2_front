import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const AuthGuard: CanActivateFn = (route, state) => { //Si no está autenticado se redirije a login
  const router = inject(Router);
  const authService = inject(AuthService);

  if (authService.check()) return true; 

  router.navigateByUrl('/login');
  return false;
};
