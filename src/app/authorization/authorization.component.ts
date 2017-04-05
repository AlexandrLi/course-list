import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthorizationService } from './../core/services';
import { LoaderService } from './../shared/loader';

@Component({
  selector: 'login',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css']
})
export class AuthorizationComponent implements OnInit {
  public login: string = '';
  public password: string = '';

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

  public signIn(): void {
    this.loaderService.show();
    if (this.login && this.password) {
      this.authService.login(this.login, this.password)
        .subscribe(() => {
          this.loaderService.hide();
          this.router.navigate(['/courses']);
        });

    }
  }
}
