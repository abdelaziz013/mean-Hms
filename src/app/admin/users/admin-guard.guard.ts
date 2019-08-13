import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';


import { UsersService } from './users.service';

@Injectable()

export class AdminGuard implements CanActivate {


  constructor(private userService: UsersService, private router: Router) { }

  canActivate() {
    const userRole = this.userService.getRole();
    let isAdmin;
    if (userRole === 'Admin'  ) {
      isAdmin = true
    }
    if (!isAdmin) {
      this.router.navigate(['not-authorized']);
    }
    return isAdmin;
  }

}
