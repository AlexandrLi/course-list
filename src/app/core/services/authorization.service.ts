import { Observable, BehaviorSubject } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { User } from './../../authorization';

@Injectable()
export class AuthorizationService {
  private static USER_KEY: string = 'user';
  public userInfo: Observable<User>;
  private userInfoSubject: BehaviorSubject<User>;

  constructor() {
    this.userInfoSubject = new BehaviorSubject(this.getUserInfo());
    this.userInfo = this.userInfoSubject.asObservable();
  }

  public login(login: string, password: string): void {
    console.log(`login: ${login} password: ${password}`);
    let user = new User(1, login);
    localStorage.setItem(AuthorizationService.USER_KEY, JSON.stringify(user));
    this.userInfoSubject.next(user);
  }

  public logout(): Observable<boolean> {
    localStorage.removeItem(AuthorizationService.USER_KEY);
    this.userInfoSubject.next(null);
    return Observable.of(true);
  }

  public isAuthenticated(): boolean {
    return localStorage.getItem(AuthorizationService.USER_KEY) ? true : false;
  }

  public getUserInfo(): User {
    let user = JSON.parse(localStorage.getItem(AuthorizationService.USER_KEY));
    return user ? user : null;
  }
}
