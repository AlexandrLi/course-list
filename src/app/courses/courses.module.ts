import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { CourseListComponent } from './course-list';
import { CourseItemComponent } from './course-item';

@NgModule({
    imports: [FormsModule, BrowserModule],
    exports: [CourseListComponent, CourseItemComponent],
    declarations: [
        CourseListComponent,
        CourseItemComponent],
    providers: [],
})
export class CoursesModule { }
