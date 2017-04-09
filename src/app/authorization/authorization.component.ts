import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { Router } from '@angular/router';

import { AuthorizationService } from './../core/services';
import { LoaderService } from './../shared/loader';

@Component({
  selector: 'login',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css']
})
export class AuthorizationComponent implements OnInit, OnDestroy {
  public login: string = '';
  public password: string = '';
  private subscription: Subscription;

  constructor(
    private authService: AuthorizationService,
    private router: Router,
    private loaderService: LoaderService) {
  }

  public ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/courses']);
    }
  }

  public ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public signIn(): void {
    this.loaderService.show();
    if (this.login && this.password) {
      this.subscription = this.authService
        .login(this.login, this.password)
        .subscribe(() => {
          this.loaderService.hide();
          this.router.navigate(['/courses']);
        });

    }
  }
}
