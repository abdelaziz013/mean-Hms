import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class ReceptionGuard implements CanActivate {
  constructor(private userService: UsersService, private router: Router) { }

  canActivate() {
    const userRole = this.userService.getRole();
    let isAdmin;
    if (userRole === 'Reception') {
      isAdmin = true
    }
    if (!isAdmin) {
      this.router.navigate(['not-authorized']);
    }
    return isAdmin;
  }
}
