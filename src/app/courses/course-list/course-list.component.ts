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
import { Observable } from 'rxjs/Rx';

import { HideLoaderAction, ShowLoaderAction } from './../../shared/loader';
import { CoursesService } from './../shared';
import { Course } from '../shared';
import { AppStore } from '../../core/store/app-store';
import {
    AddCoursesAction,
    AddCourseAction,
    ResetCoursesAction,
    DeleteCourseAction
} from './../courses.actions';

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

    public courses: Observable<Course[]>;

    public query: string = '';
    public pageNumber: number = 1;
    public count: number;
    public requestCount: number;
    public isEndOfList: boolean = false;

    constructor(
        private coursesService: CoursesService,
        private store: Store<AppStore>,
        private ref: ChangeDetectorRef) {
        this.courses = this.store.select<Course[]>('courses');
        this.count = 5;
        this.requestCount = this.count + 1;
    }

    public removeCourse(id: number): void {
        if (confirm('Do you really want to delete this course?')) {
            this.coursesService.removeItem(id).subscribe((result) => {
                this.store.dispatch(new DeleteCourseAction(id));
                this.updateCourses(this.pageNumber, this.requestCount, this.query);
            });
        }
    }

    public filter(query: string) {
        this.pageNumber = 1;
        this.query = query;
        this.isEndOfList = false;
        this.updateCourses(this.pageNumber, this.requestCount, this.query);
        // this.store.dispatch(new ShowLoaderAction());
        // this.coursesService.getCourseList(this.pageNumber, this.count, this.query)
        //     .subscribe((courses) => {
        //         this.isEndOfList = courses.length === 0;
        //         courses.pop();
        //         this.store.dispatch(new AddCoursesAction(courses));
        //         this.ref.markForCheck();
        //         this.store.dispatch(new HideLoaderAction());
        //     });
    }

    public ngOnInit(): void {
        this.store.dispatch(new ResetCoursesAction());
        this.updateCourses(this.pageNumber, this.requestCount, this.query);
    }

    public addMoreCourses() {
        this.pageNumber++;
        this.store.dispatch(new ShowLoaderAction());
        this.coursesService.getCourseList(this.pageNumber, this.requestCount, this.query)
            .subscribe((courses) => {
                this.isEndOfList = courses.length < this.requestCount;
                courses.slice(0, this.count)
                    .forEach((course) => this.store.dispatch(new AddCourseAction(course)));
                this.ref.markForCheck();
                this.store.dispatch(new HideLoaderAction());
            });
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

    private updateCourses(pageNumber: number, requestCount: number, query: string): void {
        // let itemsCount = this.count + 1;
        this.store.dispatch(new ShowLoaderAction());
        this.coursesService.getCourseList(pageNumber, requestCount, query)
            .subscribe((courses) => {
                console.log(courses);
                this.isEndOfList = courses.length < this.requestCount;
                this.store.dispatch(new AddCoursesAction(courses.slice(0, this.count)));
                this.ref.markForCheck();
                this.store.dispatch(new HideLoaderAction());
            });
    }
}
