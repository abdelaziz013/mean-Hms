import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { UsersService } from './users.service';


@Injectable()

export class AuthGuard implements CanActivate {


  constructor(private userService: UsersService, private router: Router) { }



  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    const isAuth = this.userService.getIsAuth()
    if (!isAuth) {
      this.router.navigate(['']);
    }

    return isAuth;
  }
}
