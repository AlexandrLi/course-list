import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthorizationService } from './authorization.service';
import { AppStore } from './../store/app-store';

@Injectable()
export class CanActivateViaAuthGuard implements CanActivate {
  constructor(
    private authService: AuthorizationService,
    private router: Router,
    private store: Store<AppStore>) { }

  public canActivate(): Observable<boolean> {
    return this.store.select('user').map((user) => {
      if (user) {
        return true;
      } else {
        this.router.navigate(['login']);
        return false;
      }
    });
  }
}
