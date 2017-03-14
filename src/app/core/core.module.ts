import { NgModule } from '@angular/core';

import { HeaderComponent } from './header';
import { BreadcrumbsComponent } from './header/breadcrumbs';
import { FooterComponent } from './footer';

@NgModule({
    imports: [],
    exports: [
        HeaderComponent,
        BreadcrumbsComponent,
        FooterComponent],
    declarations: [
        HeaderComponent,
        BreadcrumbsComponent,
        FooterComponent],
    providers: [],
})
export class CoreModule { }
