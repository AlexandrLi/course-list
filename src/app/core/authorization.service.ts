import { Injectable } from '@angular/core';

@Injectable()
export class AuthorizationService {
  private user: { login: string, password: string };

  public login(login: string, password: string): void {
    console.log(`login: ${login} password: ${password}`);
    this.user = { login, password };
  }

  public logout(): void {
    console.log(`Wipe user: ${this.user.login}`);
    this.user = null;
  }

  public isAuthenticated(): boolean {
    return this.user ? true : false;
  }

  public getUserInfo(): string {
    return this.user ? this.user.login : '';
  }
}
