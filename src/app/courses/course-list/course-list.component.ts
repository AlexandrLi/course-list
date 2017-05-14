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
import { Subscription } from 'rxjs/Rx';

import { LoaderService } from './../../shared/loader';
import { CoursesService } from './../shared';
import { Course } from '../shared';
import { ActivatedRoute } from '@angular/router';

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

    public courses: Course[] = [];

    public query: string = '';
    public pageNumber: number = 1;
    public count: number = 10;
    public isEndOfList: boolean = false;
    private subscriptions: Subscription[] = [];

    constructor(
        private coursesService: CoursesService,
        private loaderService: LoaderService,
        private aRoute: ActivatedRoute,
        private ref: ChangeDetectorRef) {
    }

    public removeCourse(id: number): void {
        if (confirm('Do you really want to delete this course?')) {
            this.coursesService
                .removeItem(id)
                .subscribe((result) => this.updateCourses());
        }
    }

    public filter(query: string) {
        this.pageNumber = 1;
        this.query = query;
        this.isEndOfList = false;
        this.loaderService.show();
        this.coursesService.getCourseList(this.pageNumber, this.count, this.query)
            .subscribe((courses) => {
                this.isEndOfList = courses.length === 0;
                this.courses = courses;
                this.ref.markForCheck();
                this.loaderService.hide();
            });
    }

    public ngOnInit(): void {
        this.updateCourses();
    }

    public addMoreCourses() {
        this.pageNumber++;
        this.updateCourses();
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

    private updateCourses(): void {
        this.loaderService.show();
        this.coursesService.getCourseList(this.pageNumber, this.count, this.query)
            .subscribe((courses) => {
                if (courses.length === 0) {
                    this.isEndOfList = true;
                } else {
                    courses.forEach((course) => this.courses.push(course));
                }
                this.ref.markForCheck();
                this.loaderService.hide();
            });
    }
}
