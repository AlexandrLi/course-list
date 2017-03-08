/*
 * Angular 2 decorators and services
 */
import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.css'
  ],
  template: `
    <my-header></my-header>
<router-outlet></router-outlet>
    <my-footer></my-footer>
  `
})
export class AppComponent implements OnInit {

  constructor() { }

  public ngOnInit() { }

}
