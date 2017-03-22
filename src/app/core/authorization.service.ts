import { Injectable } from '@angular/core';

@Injectable()
export class AuthorizationService {
  private username: string;

  public login(login: string, password: string): void {
    console.log(`login: ${login} password: ${password}`);
    this.username = login;
    localStorage.setItem('user', login);
  }

  public logout(): void {
    console.log(`Wipe user: ${this.username}`);
    this.username = null;
    localStorage.removeItem('user');
  }

  public isAuthenticated(): boolean {
    return localStorage.getItem('user') ? true : false;
  }

  public getUserInfo(): string {
    return this.username ? this.username : '';
  }
}
