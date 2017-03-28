import { Router } from '@angular/router';
import { AuthorizationService } from './../core/services';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'login',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css']
})
export class AuthorizationComponent implements OnInit {
  public login: string = '';
  public password: string = '';

  constructor(private authService: AuthorizationService, private router: Router) {
  }

  public ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/courses']);
    }
  }

  public signIn(): void {
    if (this.login && this.password) {
      this.authService.login(this.login, this.password);
      this.router.navigate(['/courses']);
    }
  }
}
