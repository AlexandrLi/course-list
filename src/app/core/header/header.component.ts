import { Router } from '@angular/router';
import { AuthorizationService } from './../authorization.service';
import { Component, DoCheck } from '@angular/core';

@Component({
    selector: 'my-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements DoCheck {

    public logoURL: string = '../../../assets/img/angular-logo.png';
    public title: string = 'Mentoring Program';
    public currentUsername: string = '';
    public isAuthenticated: boolean;

    constructor(private authService: AuthorizationService, private router: Router) {
        this.isAuthenticated = this.authService.isAuthenticated();
    }

    public ngDoCheck() {
        this.currentUsername = this.authService.getUserInfo();
        this.isAuthenticated = this.authService.isAuthenticated();
    }

    public logout() {
        this.authService.logout();
        this.router.navigate(['/login']);
    }
}
