import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CourseListComponent } from './course-list';
import { CourseItemComponent } from './course-item';
import { ToolbarComponent } from './toolbar';
import { LoaderComponent } from './../shared/loader';

import { CoursesService } from './shared/courses.service';

@NgModule({
    imports: [FormsModule, CommonModule],
    exports: [
        CourseListComponent,
        CourseItemComponent,
        LoaderComponent
    ],
    declarations: [
        CourseListComponent,
        CourseItemComponent,
        ToolbarComponent,
        LoaderComponent
    ],
    providers: [
        CoursesService
    ],
})
export class CoursesModule { }
