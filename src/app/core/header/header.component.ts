import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

import { User } from './../../authorization';
import { LoaderService } from './../../shared/loader';
import { AuthorizationService } from './../services';

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
        private ref: ChangeDetectorRef,
        private loaderService: LoaderService) {
        this.authService.userInfo.subscribe(
            (user) => {
                this.currentUser = user;
                this.ref.markForCheck();
            });
    }

    public logout() {
        this.loaderService.show();
        this.authService.logout()
            .subscribe(() => {
                this.loaderService.hide();
                this.router.navigate(['/login']);
            });
    }
}
