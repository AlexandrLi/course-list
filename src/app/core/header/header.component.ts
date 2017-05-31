import { Store } from '@ngrx/store';
import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';

import { User } from './../../authorization';
import { AppStore } from './../store/app-store';
import { HideLoaderAction, ShowLoaderAction } from './../../shared/loader';
import { AuthorizationService } from './../services';

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
        private router: Router,
        private ref: ChangeDetectorRef,
        private store: Store<AppStore>) {
        this.breadcrumbs = this.store.select('breadcrumbs');
        this.authService.userInfo
            .subscribe((user) => {
                this.currentUser = user;
                this.ref.markForCheck();
            });
    }

    public logout() {
        this.store.dispatch(new ShowLoaderAction());
        this.subscriptions.push(this.authService
            .logout()
            .subscribe(() => {
                this.store.dispatch(new HideLoaderAction());
                this.router.navigate(['/login']);
            }));
    }

    public ngOnDestroy() {
        this.subscriptions.forEach((sub) => sub.unsubscribe());
    }
}
