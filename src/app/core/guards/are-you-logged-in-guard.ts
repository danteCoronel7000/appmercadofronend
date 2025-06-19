import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Authentication } from '../services/authentication.service';

export const areYouLoggedInGuard: CanActivateFn = (route, state) => {
  const authenticationService = inject(Authentication);
  const router = inject(Router);

  if(authenticationService.isAuthenticated()) {
    return true;
  }else{
    return router.navigate(['/sing-in']);
  }
};
