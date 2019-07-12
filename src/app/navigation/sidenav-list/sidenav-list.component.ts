import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { UsersService } from 'src/app/admin/users/users.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {

  @Output() sideNavClose = new EventEmitter <void>();
  @Output() sideNavWidth = new EventEmitter <void>();
  contentMargin;

  userIsAuthenticated = false;
  userId: string;
  name: string;
  userRole;
  private authListenerSubs: Subscription;

  constructor(private userService: UsersService) { }

  ngOnInit() {
    this.userIsAuthenticated = this.userService.getIsAuth();
    this.userRole = this.userService.getRole();
    this.authListenerSubs = this.userService.getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.userService.getUserId();
        this.name = this.userService.getname();
        this.userRole =this.userService.getRole();
      });

  }

  onClose(){
    this.sideNavClose.emit();
    this.sideNavWidth.emit()
  }


}
