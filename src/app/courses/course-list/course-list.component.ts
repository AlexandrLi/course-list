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
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Rx';

import { HideLoaderAction, ShowLoaderAction } from './../../shared/loader';
import { CoursesService } from './../shared';
import { Course } from '../shared';
import { AppStore } from '../../core/store/app-store';

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
    public count: number = 5;
    public isEndOfList: boolean = false;

    constructor(
        private coursesService: CoursesService,
        private store: Store<AppStore>,
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
        this.store.dispatch(new ShowLoaderAction());
        this.coursesService.getCourseList(this.pageNumber, this.count, this.query)
            .subscribe((courses) => {
                this.isEndOfList = courses.length === 0;
                this.courses = courses;
                this.ref.markForCheck();
                this.store.dispatch(new HideLoaderAction());
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
        this.store.dispatch(new ShowLoaderAction());
        this.coursesService.getCourseList(this.pageNumber, this.count, this.query)
            .subscribe((courses) => {
                if (courses.length === 0) {
                    this.isEndOfList = true;
                } else {
                    courses.forEach((course) => this.courses.push(course));
                }
                this.ref.markForCheck();
                this.store.dispatch(new HideLoaderAction());
            });
    }
}
