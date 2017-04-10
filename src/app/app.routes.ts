import { Routes } from '@angular/router';

import { AuthorizationComponent } from './authorization';
import { NoContentComponent } from './no-content';
import { CourseListComponent } from './courses/course-list';
import { AddCourseComponent } from './courses/add-course';

export const ROUTES: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: AuthorizationComponent },
  { path: 'courses', component: CourseListComponent },
  { path: 'courses/add', component: AddCourseComponent },
  { path: '**', component: NoContentComponent },
];
