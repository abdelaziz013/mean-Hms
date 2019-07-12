import { Component, OnInit } from '@angular/core';
import { UsersService } from './admin/users/users.service';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title;
  closedWidth: boolean;


  constructor(private userService: UsersService,
    private titleService: Title,
    private activatedRoute: ActivatedRoute,
    private router: Router,


  ) { }


  ngOnInit() {
    this.userService.autoAuthUser();
    const appTitle = this.titleService.getTitle();
    this.router
      .events.pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => {
          let child;
          if (this.activatedRoute.firstChild.children[0]) {
            child = this.activatedRoute.firstChild.children[0]
          } else {
            child = this.activatedRoute.firstChild;
          }

          if (child.snapshot.data['title']) {
            return child.snapshot.data.title;
          }
          return appTitle;
        })
      ).subscribe((ttl: string) => {
        this.titleService.setTitle(ttl);
      });
  }



}





