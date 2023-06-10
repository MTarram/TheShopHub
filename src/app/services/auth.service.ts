import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { User } from '../shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;
  url:string='https://fakestoreapi.com'
  constructor(
    private location: Location,
      private router: Router,
      private http: HttpClient
  ) {
      this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
      this.user = this.userSubject.asObservable();
  }

  public get userValue() {
      return this.userSubject.value;
  }

  login(username: string, password: string) {
      return this.http.post<User>(`${this.url}/auth/login`, { username, password })
          .pipe(map(user => {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              localStorage.setItem('user', JSON.stringify({ username }));
              localStorage.setItem('token', JSON.stringify(user));

              this.router.navigate(['/home']);

              this.userSubject.next(user);
              return user;
          }));
  }
  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    // Check whether the token is expired and return
    // true or false
    return token? true:false
  }
  logout() {
      // remove user from local storage and set current user to null
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      this.userSubject.next(null);
      this.router.navigate(['/login']);
  }

  public isLoggedIn(): boolean {
    if (this.location.path() === '/login' && this.isAuthenticated()) {
      return true;
    } else {
      return false;
    }
  }
}
