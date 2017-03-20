import { AuthorizationComponent } from './authorization';
import { Routes } from '@angular/router';
import { NoContentComponent } from './no-content';
import { CourseListComponent } from './courses/course-list';

export const ROUTES: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: AuthorizationComponent },
  { path: 'courses', component: CourseListComponent },
  { path: '**', component: NoContentComponent },
];
