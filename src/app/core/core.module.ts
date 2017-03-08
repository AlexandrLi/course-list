import { NgModule } from '@angular/core';

import { HeaderComponent } from './header/header.component';
import { BreadcrumbsComponent } from './header/breadcrumbs/breadcrumbs.component';
import { FooterComponent } from './footer/footer.component';

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
