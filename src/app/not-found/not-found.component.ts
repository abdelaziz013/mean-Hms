import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UsersService } from '../admin/users/users.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {
  userIsAuthenticated = false;
  userId: string;
  name: string;
  userRole: string;
  private authListenerSubs: Subscription;

  constructor(private userService: UsersService) { }

  ngOnInit() {
    this.userIsAuthenticated = this.userService.getIsAuth();
    this.name = this.userService.getname();
    this.userRole = this.userService.getRole();
    this.authListenerSubs = this.userService.getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.userService.getUserId();
        this.name = this.userService.getname();
        this.userRole =this.userService.getRole();
      });

  }

}
