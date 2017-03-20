import { Router } from '@angular/router';
import { AuthorizationService } from './../core/authorization.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'login',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css']
})
export class AuthorizationComponent {
  public login: string = '';
  public password: string = '';

  constructor(private authService: AuthorizationService, private router: Router) {

  }

  public signIn(): void {
    if (this.login && this.password) {
      this.authService.login(this.login, this.password);
      this.router.navigate(['/courses']);
    }
  }
}
