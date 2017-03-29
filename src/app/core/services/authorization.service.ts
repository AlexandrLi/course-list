import { Observable, Observer } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { User } from './../../authorization';

@Injectable()
export class AuthorizationService {
  private static USER_KEY: string = 'user';
  public userInfo: Observable<User>;
  private userInfoObserver: Observer<User>;

  constructor() {
    this.userInfo = new Observable((observer) => this.userInfoObserver = observer);
  }

  public login(login: string, password: string): void {
    console.log(`login: ${login} password: ${password}`);
    let user = new User(1, login);
    localStorage.setItem(AuthorizationService.USER_KEY, JSON.stringify(user));
    this.userInfoObserver.next(user);
  }

  public logout(): Observable<boolean> {
    localStorage.removeItem(AuthorizationService.USER_KEY);
    this.userInfoObserver.next(null);
    return Observable.of(true);
  }

  public isAuthenticated(): boolean {
    if (localStorage.getItem(AuthorizationService.USER_KEY)) {
      this.userInfoObserver.next(this.getUserInfo());
      return true;
    }
    return false;
  }

  public getUserInfo(): User {
    let user = JSON.parse(localStorage.getItem(AuthorizationService.USER_KEY));
    return user ? user : null;
  }
}
