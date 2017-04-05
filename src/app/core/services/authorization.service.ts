import { Observable, Subject, BehaviorSubject } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { User } from './../../authorization';

@Injectable()
export class AuthorizationService {
  private static USER_KEY: string = 'AMP-user';
  public userInfo: Observable<User>;
  private userInfoSubject: BehaviorSubject<User>;

  constructor() {
    this.userInfoSubject = new BehaviorSubject(this.getUserInfo());
    this.userInfo = this.userInfoSubject.asObservable();
  }

  public login(login: string, password: string): Observable<boolean> {
    let result = new Subject();
    setTimeout(() => {
      console.log(`login: ${login} password: ${password}`);
      let user = new User(1, login);
      localStorage.setItem(AuthorizationService.USER_KEY, JSON.stringify(user));
      this.userInfoSubject.next(user);
      result.next(true);
    }, 1200);
    return result.asObservable();
  }

  public logout(): Observable<boolean> {
    let result = new Subject();
    setTimeout(() => {
      localStorage.removeItem(AuthorizationService.USER_KEY);
      this.userInfoSubject.next(null);
      result.next(true);
    }, 1200);
    return result.asObservable();
  }

  public isAuthenticated(): boolean {
    return localStorage.getItem(AuthorizationService.USER_KEY) ? true : false;
  }

  public getUserInfo(): User {
    let user = JSON.parse(localStorage.getItem(AuthorizationService.USER_KEY));
    return user ? user : null;
  }
}
