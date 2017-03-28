import { CoursesService } from './shared/courses.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CourseListComponent } from './course-list';
import { CourseItemComponent } from './course-item';
import { ToolbarComponent } from './toolbar';

@NgModule({
    imports: [FormsModule, CommonModule],
    exports: [
        CourseListComponent,
        CourseItemComponent,
    ],
    declarations: [
        CourseListComponent,
        CourseItemComponent,
        ToolbarComponent],
    providers: [CoursesService],
})
export class CoursesModule { }
