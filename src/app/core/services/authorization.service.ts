import { Observable, Observer } from 'rxjs/Rx';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthorizationService {
  private static USER_KEY: string = 'user';
  public user: Observable<{ id: number, name: string }>;

  public login(login: string, password: string): void {
    console.log(`login: ${login} password: ${password}`);
    this.user = Observable.of({ id: 1, name: login });
    localStorage.setItem(AuthorizationService.USER_KEY, JSON.stringify({ id: 1, name: login }));
  }

  public logout(): void {
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
