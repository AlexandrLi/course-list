import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs/Rx';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from './../../authorization';
import { LoaderService } from './../../shared/loader';
import { AuthorizationService, BreadcrumbsService } from './../services';

@Component({
    selector: 'my-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnDestroy {

    public logoURL: string = '../../../assets/img/angular-logo.png';
    public title: string = 'Mentoring Program';
    public currentUser: User = new User();
    public breadcrumbs: Observable<string>;
    private subscriptions: Subscription[] = [];

    constructor(
        public authService: AuthorizationService,
        private breadcrumbsService: BreadcrumbsService,
        private router: Router,
        private aRoute: ActivatedRoute,
        private ref: ChangeDetectorRef,
        private loaderService: LoaderService) {
        this.breadcrumbs = this.breadcrumbsService.path;
        this.authService.userInfo
            .subscribe((user) => {
                this.currentUser = user;
                this.ref.markForCheck();
            });
    }

    public logout() {
        this.loaderService.show();
        this.subscriptions.push(this.authService
            .logout()
            .subscribe(() => {
                this.loaderService.hide();
                this.router.navigate(['/login']);
            }));
    }

    public ngOnDestroy() {
        this.subscriptions.forEach((sub) => sub.unsubscribe());
    }
}
