import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserContextService } from '../Modulo-seguridad/Services/user-context.service';
import { UsuarioContext } from '../Modulo-seguridad/Models/seg-login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private userContextService: UserContextService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    let user = this.userContextService.user$.getValue();


    if (!user) {
      const data = this.userContextService['storageService'].getItemDecrypt('currentUser');
      if (data) {
        this.userContextService.setUser(data);
        user = data as UsuarioContext;
      }
    }

    if (!user) {
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false;
    }

    const expectedRoles: string[] = route.data['expectedRoles'];
    if (expectedRoles && !expectedRoles.includes(user.rol)) {
      this.router.navigate(['/main/cl-dashboard']);
      return false;
    }

    return true;
  }
}
