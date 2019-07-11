import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { UsersService } from 'src/app/admin/users/users.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() toggleEvent = new EventEmitter<void>();
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


      // console.log(this.userRole)


  }

  onToggleSdenav() {
    this.toggleEvent.emit();

  }

  onLogOut() {
    this.userService.logOut();

  }


  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

}
