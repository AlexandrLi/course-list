import { Routes } from '@angular/router';
import { NoContentComponent } from './no-content';
import { CourseListComponent } from './courses/course-list';

export const ROUTES: Routes = [
  { path: '', redirectTo: 'courses', pathMatch: 'full' },
  { path: 'courses', component: CourseListComponent },
  { path: '**', component: NoContentComponent },
];
