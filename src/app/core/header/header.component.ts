import { Router } from '@angular/router';
import { AuthorizationService } from './../services';
import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { User } from './../../authorization';

@Component({
    selector: 'my-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {

    public logoURL: string = '../../../assets/img/angular-logo.png';
    public title: string = 'Mentoring Program';
    public currentUser: User;

    constructor(
        public authService: AuthorizationService,
        private router: Router,
        private ref: ChangeDetectorRef) {
        this.authService.userInfo.subscribe(
            (user) => {
                this.currentUser = user;
                this.ref.markForCheck();
            });
    }

    public logout() {
        this.authService.logout()
            .subscribe(() => this.router.navigate(['/login']));
    }
}
