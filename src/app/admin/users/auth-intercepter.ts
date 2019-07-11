import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsersService } from './users.service';

@Injectable()
export class AuthInercepter implements HttpInterceptor {

  constructor(private userService: UsersService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.userService.getToken();
    // req.clone create a copy of request
    const authRequest = req.clone({
      // set add new headers to header
      // you must add Bearer and white space
      headers: req.headers.set('Authorization', 'Bearer ' + authToken)
    });
    return next.handle(authRequest);
  }
}
