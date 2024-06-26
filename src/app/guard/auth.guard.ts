import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  if (localStorage.getItem('Auth')) {
    return true;
  } else {
    router.navigate(['/home'])
    return false;
  }
  
};
