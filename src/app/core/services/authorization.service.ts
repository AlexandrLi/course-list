import {
  Request,
  Headers,
  RequestOptions,
  URLSearchParams,
  RequestMethod,
  Response
} from '@angular/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs/Rx';
import { Injectable } from '@angular/core';

import { User } from './../../authorization';
import { AuthorizedHTTPService } from './';

@Injectable()
export class AuthorizationService {

  private static USER_KEY: string = 'AMP-token';
  public userInfo: Observable<User>;
  private baseUrl: string = 'http://localhost:3004';
  private userInfoSubject: BehaviorSubject<User>;

  constructor(private http: AuthorizedHTTPService) {
    this.userInfoSubject = new BehaviorSubject(new User());
    this.userInfo = this.getUserInfo();
  }

  public login(login: string, password: string): Observable<any> {
    let requestOptions: RequestOptions = new RequestOptions({ headers: new Headers() });
    let request: Request;

    requestOptions.url = `${this.baseUrl}/auth/login`;
    requestOptions.method = RequestMethod.Post;
    requestOptions.headers.append('Content-Type', 'application/json');
    requestOptions.body = JSON.stringify({ login, password });

    request = new Request(requestOptions);

    return this.http.request(request)
      .map((response: Response) => response.json())
      .do((result) => localStorage.setItem(AuthorizationService.USER_KEY, result.token));
  }

  public logout(): Observable<boolean> {
    localStorage.removeItem(AuthorizationService.USER_KEY);
    return Observable.of(true);
  }

  public isAuthenticated(): boolean {
    return localStorage.getItem(AuthorizationService.USER_KEY) ? true : false;
  }

  public getUserInfo(): Observable<User> {
    let requestOptions: RequestOptions = new RequestOptions({ headers: new Headers() });
    let request: Request;

    requestOptions.url = `${this.baseUrl}/auth/userinfo`;
    requestOptions.method = RequestMethod.Post;

    request = new Request(requestOptions);

    return this.http.request(request)
      .map((response: Response) => response.json())
      .map((user) => new User(user.id, user.name.first));
  }
}
