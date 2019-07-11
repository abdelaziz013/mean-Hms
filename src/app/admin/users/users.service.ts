
import { Injectable } from '@angular/core';
import { User } from './users.model';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';





@Injectable({ providedIn: 'root' })
export class UsersService {
  private usersList: User[] = [];
  private token: string;
  private tokenTimer: any;
  private authStatusListenr = new Subject<boolean>();
  private usersListUpdated = new Subject<{ users: User[], maxCount: number }>();
  private isAutenticated = false;
  private userId: string;
  public name: string;
  public userRole: string;
  public loginDoctor: string;

  constructor(private http: HttpClient, private router: Router) { }

  getToken() {
    return this.token;
  }

  getAuthStatusListener() {
    return this.authStatusListenr.asObservable();
  }

  getIsAuth() {
    return this.isAutenticated;
  }

  getUserId() {
    return this.userId;
  }

  getname() {
    return this.name;
  }

  getRole() {
    return this.userRole;
  }
  getLoginDoctor() {
    return this.loginDoctor;
  }

  // add user
  createUser(user: User) {
    this.http.post('http://localhost:3000/users/add-users', user)
      .subscribe((response) => {
        this.router.navigate(['/admin/users-list'])
      })
  }


  login(username: string, password: string) {
    const loginData = { username, password };
    this.http
      .post<{
        token: string,
        expiresIn: number,
        userId: string,
        name: string,
        userRole: string,
        doctor: string
      }>('http://localhost:3000/users/login', loginData)
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        if (token) {
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.isAutenticated = true;
          this.userId = response.userId;
          this.loginDoctor = response.doctor;
          this.name = response.name;
          this.userRole = response.userRole;
          this.authStatusListenr.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          this.saveAuthData(token, expirationDate, this.name, this.userRole, this.loginDoctor)
          this.router.navigate(['admin'])
        }
      })
  }

  autoAuthUser() {
    const authData = this.getAuthData();
    if (!authData) {
      return;
    }
    const now = new Date();
    const expiresIn = authData.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authData.token;
      this.name = authData.name;
      this.userRole = authData.role;
      this.loginDoctor =authData.doctor;
      this.isAutenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListenr.next(true);
    }
  }

  logOut() {
    this.token = null;
    this.isAutenticated = false;
    this.authStatusListenr.next(false);
    clearTimeout(this.tokenTimer);
    this.userId = null;
    this.name = null;
    this.userRole = null;
    this.loginDoctor = null;
    this.clearAuthData();
    this.router.navigate(['']);
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logOut();
    }, duration * 1000)

  }

  private saveAuthData(token: string, expirationDate: Date, name: string, userRole: string, logindoctor: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('name', name);
    localStorage.setItem('role', userRole)
    localStorage.setItem('doctor', logindoctor)
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('name');
    localStorage.removeItem('role');
    localStorage.removeItem('doctor');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const name = localStorage.getItem('name');
    const role = localStorage.getItem('role');
    const doctor = localStorage.getItem('doctor')

    if (!token || !expirationDate) {
      return;
    }
    return {
      token,
      name,
      role,
      doctor,
      expirationDate: new Date(expirationDate)
    }
  }

  // userList
  getUserList(itemPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${itemPerPage}&page=${currentPage}`;
    this.http.get<{ users: User[], maxCount: number }>('http://localhost:3000/users/user-list' + queryParams)
      .subscribe((respnseData) => {
        this.usersList = respnseData.users;
        this.usersListUpdated.next({
          users: [...this.usersList],
          maxCount: respnseData.maxCount
        })
      })
  }

  getUserListUpdatListener() {
    return this.usersListUpdated.asObservable()
  }

  // get user by Id
  getUserById(id: string) {
    return this.http.get<{ user: User }>('http://localhost:3000/users/user/' + id)
  }

  // update user
  updateUser(id: string, user: User) {
    this.http.put('http://localhost:3000/users/edit-user/' + id, user)
      .subscribe((response) => {
        this.router.navigate(['/admin/users-list'])
      })

  }
  // delete user
  deleteUser(id: string) {
    return this.http.delete('http://localhost:3000/users/del-user/' + id)
  }

}
