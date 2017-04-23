import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CourseListComponent } from './course-list';
import { CourseItemComponent } from './course-item';
import { AddCourseComponent } from './add-course';
import { ToolbarComponent } from './toolbar';
import { FilterPipe, OrderByPipe, DurationPipe, CourseHighlightDirective } from './shared';
import { LoaderComponent } from './../shared/loader';

import { CoursesService } from './shared/courses.service';

@NgModule({
    imports: [FormsModule, CommonModule],
    exports: [
        CourseListComponent,
        CourseItemComponent,
        AddCourseComponent,
        LoaderComponent
    ],
    declarations: [
        CourseListComponent,
        CourseItemComponent,
        AddCourseComponent,
        ToolbarComponent,
        CourseHighlightDirective,
        DurationPipe,
        OrderByPipe,
        LoaderComponent
    ],
    providers: [
        CoursesService,
        FilterPipe
    ],
})
export class CoursesModule { }
