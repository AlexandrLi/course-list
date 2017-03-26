import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthorizationService {
  private static USER_KEY: string = 'user';
  public userInfo: Observable<{ id: number, name: string }>;
  private username: string;

  public login(login: string, password: string): void {
    console.log(`login: ${login} password: ${password}`);
    this.userInfo = Observable.of({ id: 1, name: login });
    localStorage.setItem(AuthorizationService.USER_KEY, JSON.stringify({ id: 1, name: login }));
  }

  public logout(): void {
    console.log(`Wipe user: ${this.username}`);
    this.username = null;
    localStorage.removeItem(AuthorizationService.USER_KEY);
  }

  public isAuthenticated(): boolean {
    return localStorage.getItem(AuthorizationService.USER_KEY) ? true : false;
  }

  public getUserInfo(): string {
    let user = JSON.parse(localStorage.getItem(AuthorizationService.USER_KEY));
    return user ? user.name : '';
  }
}
