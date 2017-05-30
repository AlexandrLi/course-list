import { AddTokenAction, AddUserAction } from './../../authorization/user.actions';
import { AppStore } from './../store/app-store';
import { Store } from '@ngrx/store';
import {
  Request,
  Headers,
  RequestOptions,
  RequestMethod,
  Response
} from '@angular/http';
import { Observable, BehaviorSubject } from 'rxjs/Rx';
import { Injectable } from '@angular/core';

import { User } from './../../authorization';
import { AuthorizedHTTPService } from './';

@Injectable()
export class AuthorizationService {

  private static USER_KEY: string = 'AMP-token';
  public userInfo: Observable<User>;
  private userInfoSubject: BehaviorSubject<User | null> = new BehaviorSubject(null);

  constructor(private http: AuthorizedHTTPService, private store: Store<AppStore>) {
    this.store.select('user').subscribe((user: User) => this.userInfoSubject.next(user));
    // if (this.isAuthenticated()) {
    //   this.getUserInfo();
    // }
    this.userInfo = this.userInfoSubject.asObservable();
  }

  public login(login: string, password: string): Observable<any> {
    let requestOptions: RequestOptions = new RequestOptions({ headers: new Headers() });
    let request: Request;

    requestOptions.url = `/auth/login`;
    requestOptions.method = RequestMethod.Post;
    requestOptions.headers.append('Content-Type', 'application/json');
    requestOptions.body = JSON.stringify({ login, password });

    request = new Request(requestOptions);

    return this.http.request(request)
      .map((response: Response) => response.json())
      .do((result) => localStorage.setItem(AuthorizationService.USER_KEY, result.token))
      .do(() => this.getUserInfo())
      .catch((err) => {
        throw Observable.of(err);
      });
  }

  public logout(): Observable<boolean> {
    localStorage.removeItem(AuthorizationService.USER_KEY);
    this.store.dispatch(new AddTokenAction(null));
    return Observable.of(true);
  }

  public isAuthenticated(): boolean {
    // return localStorage.getItem(AuthorizationService.USER_KEY) ? true : false;
    return !!this.userInfoSubject.getValue();
  }

  public getUserInfo() {
    let requestOptions: RequestOptions = new RequestOptions({ headers: new Headers() });
    let request: Request;

    requestOptions.url = `/auth/userinfo`;
    requestOptions.method = RequestMethod.Post;

    request = new Request(requestOptions);
    this.http.request(request)
      .map((res) => res.json())
      .subscribe((user) => {
        console.log(user);
        this.store.dispatch(new AddUserAction(new User(user.id, user.name.first)));
        // this.userInfoSubject.next(new User(user.id, user.name.first));
      });
  }
}
