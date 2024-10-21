//Guard: función que se ejecuta antes de hacer el display
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const GuestGuard: CanActivateFn = (route, state) => { //Puedo activar ruta o no
  const router = inject(Router);
  const authService = inject(AuthService);

  if (!authService.check()) return true; //Si el usuario está autenticado o no

  router.navigateByUrl('/app/dashboard');
  return false;
};
