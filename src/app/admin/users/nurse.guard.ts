import { Injectable } from '@angular/core';
import {  CanActivate, Router } from '@angular/router';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class NurseGuard implements CanActivate   {
  constructor(private userService: UsersService, private router: Router) { }

  canActivate() {
    const userRole = this.userService.getRole();
    let isAdmin;
    if (userRole === 'Admin'||userRole === 'Nurse') {
      isAdmin = true
    }
    if (!isAdmin) {
      this.router.navigate(['not-authorized']);
    }
    return isAdmin;
  }

}
