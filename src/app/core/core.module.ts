import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { HeaderComponent } from './header';
import { BreadcrumbsComponent } from './header/breadcrumbs';
import { FooterComponent } from './footer';
import {
    AuthorizationService,
    CanActivateViaAuthGuard,
    BreadcrumbsService
} from './services';
import { loaderReducer } from './../shared/loader';
import { INITIAL_STATE } from './store/app-store';
import { userReducer, userTokenReducer } from '../authorization/user.reducer';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        StoreModule.provideStore({
            loader: loaderReducer,
            user: userReducer,
            userToken: userTokenReducer,
        }, INITIAL_STATE),
        StoreDevtoolsModule.instrumentOnlyWithExtension({
            maxAge: 5
        })],
    exports: [
        HeaderComponent,
        BreadcrumbsComponent,
        FooterComponent],
    declarations: [
        HeaderComponent,
        BreadcrumbsComponent,
        FooterComponent],
    providers: [
        AuthorizationService,
        BreadcrumbsService,
        CanActivateViaAuthGuard
    ],
})
export class CoreModule { }
