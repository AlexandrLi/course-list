import { LoaderService } from './../../shared/loader/loader.service';
import { Router } from '@angular/router';
import { CoursesService } from './../shared';
import {
    Component,
    OnInit,
    OnDestroy,
    OnChanges,
    DoCheck,
    SimpleChanges,
    AfterViewChecked,
    AfterViewInit,
    AfterContentChecked,
    AfterContentInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef
} from '@angular/core';
import { Course } from '../shared/course.model';

@Component({
    selector: 'course-list',
    templateUrl: 'course-list.component.html',
    styleUrls: ['./course-list.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseListComponent implements
    OnChanges,
    OnInit,
    DoCheck,
    AfterViewChecked,
    AfterViewInit,
    AfterContentChecked,
    AfterContentInit,
    OnDestroy {

    public courses: Course[];

    constructor(
        private coursesService: CoursesService,
        private router: Router,
        private loaderService: LoaderService,
        private ref: ChangeDetectorRef) {
        this.courses = [];
    }

    public removeCourse(id: number): void {
        if (confirm('Do you really want to delete this course?')) {
            let deleted: boolean;
            this.coursesService.removeItem(id).subscribe((result) => deleted = result);
            if (deleted) {
                this.coursesService.getList()
                    .subscribe((courses) => this.courses = courses);
            }
        }
    }

    public ngOnInit(): void {
        this.loaderService.show();
        this.coursesService.getList()
            .subscribe((courses) => {
                this.courses = courses;
                this.ref.markForCheck();
            },
            null,
            () => this.loaderService.hide());
    }

    public ngAfterContentInit(): void {
        // remove no_empty rule notification
    }

    public ngAfterContentChecked(): void {
        // remove no_empty rule notification
    }

    public ngAfterViewInit(): void {
        // remove no_empty rule notification
    }

    public ngAfterViewChecked(): void {
        // remove no_empty rule notification
    }

    public ngOnDestroy(): void {
        // remove no_empty rule notification
    }

    public ngDoCheck(): void {
        // remove no_empty rule notification
    }

    public ngOnChanges(changes: SimpleChanges): void {
        // remove no_empty rule notification
    }
}
