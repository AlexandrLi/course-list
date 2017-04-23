import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HeaderComponent } from './header';
import { BreadcrumbsComponent } from './header/breadcrumbs';
import { FooterComponent } from './footer';
import { AuthorizationService } from './services';
import { LoaderService } from './../shared/loader';

@NgModule({
    imports: [CommonModule],
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
        LoaderService
    ],
})
export class CoreModule { }
