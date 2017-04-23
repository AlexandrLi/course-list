import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, XHRBackend, RequestOptions } from '@angular/http';
import {
  NgModule
} from '@angular/core';
import {
  RouterModule,
  PreloadAllModules
} from '@angular/router';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
// App is our top level component
import { AppComponent } from './app.component';
import { AuthorizationComponent } from './authorization';
import { NoContentComponent } from './no-content';
import { CoreModule } from './core';
import { CoursesModule } from './courses';
import { AuthorizedHTTPService } from './core/services';

// Application wide providers
const APP_PROVIDERS = [];

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    AuthorizationComponent,
    NoContentComponent
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    FormsModule,
    HttpModule,
    CoreModule,
    CoursesModule,
    RouterModule.forRoot(ROUTES, { useHash: true, preloadingStrategy: PreloadAllModules })
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    {
      provide: AuthorizedHTTPService,
      useFactory: (backend: XHRBackend, options: RequestOptions) => {
        return new AuthorizedHTTPService(backend, options);
      },
      deps: [XHRBackend, RequestOptions]
    },
    ENV_PROVIDERS,
    APP_PROVIDERS
  ]
})
export class AppModule {

}
