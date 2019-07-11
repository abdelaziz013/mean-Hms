import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsersService } from '../admin/users/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  name: string;
  hide = true;


  constructor(public userService: UsersService) { }

  ngOnInit() {



  }

  onLogin(loginForm: NgForm) {
        if (loginForm.invalid) {
      return;
    }
        this.userService.login(loginForm.value.username, loginForm.value.password);
        loginForm.resetForm()


  }

}
