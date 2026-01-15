import {inject} from '@angular/core';
import {CanActivateFn, Router} from '@angular/router';
import {AuthService} from '../api/auth.service';
import {ERole} from '../api/user.service';

export const isSuperAdminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const user = authService.getUser();

  if (user?.role === ERole.SuperAdmin) {
    return true;
  }

  console.log('Unauthorized access');
  router.navigate(['/']);
  return false;
};
