import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthorizationComponent } from './authorization';
import { NoContentComponent } from './no-content';
import { CourseListComponent } from './courses/course-list';
import { AddCourseComponent } from './courses/add-course';

const routes: Routes = [
  { path: '', redirectTo: 'courses', pathMatch: 'full' },
  { path: 'login', component: AuthorizationComponent },
  { path: 'courses', component: CourseListComponent },
  { path: 'courses/new', component: AddCourseComponent, pathMatch: 'full' },
  { path: 'courses/:id', component: AddCourseComponent },
  { path: '404', component: NoContentComponent },
  { path: '**', redirectTo: '404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
