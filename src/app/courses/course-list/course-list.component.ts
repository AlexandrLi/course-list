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
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { LoaderService } from './../../shared/loader';
import { CoursesService, CourseHighlightDirective, FilterPipe } from './../shared';
import { Course } from '../shared';

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

    public filteredCourses: Course[];
    public query: string = '';
    public pageNumber: number = 1;
    public count: number = 10;
    private subscriptions: Subscription[] = [];

    constructor(
        private coursesService: CoursesService,
        private router: Router,
        private loaderService: LoaderService,
        private ref: ChangeDetectorRef,
        private filterPipe: FilterPipe) {
    }

    public removeCourse(id: number): void {
        if (confirm('Do you really want to delete this course?')) {
            this.subscriptions.push(this.coursesService
                .removeItem(id)
                .subscribe((result) => this.updateCourses()));
        }
    }

    public filter(query: string) {
        this.query = query;
        this.loaderService.show();
        // this.filteredCourses = this.filterPipe.transform(this.courses, query);
        this.subscriptions.push(this.coursesService
            .getListByQuery(query, this.pageNumber, this.count)
            .subscribe((courses) => {
                this.courses = courses;
                this.ref.markForCheck();
            },
            null,
            () => this.loaderService.hide()));
    }

    public ngOnInit(): void {
        this.updateCourses();
    }

    public addMoreCourses() {
        this.count = this.count + 10;
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
        this.subscriptions.forEach((sub) => sub.unsubscribe());
    }

    public ngDoCheck(): void {
        // remove no_empty rule notification
    }

    public ngOnChanges(changes: SimpleChanges): void {
        // remove no_empty rule notification
    }

    private updateCourses(): void {
        this.loaderService.show();
        console.log(this.count);
        this.subscriptions.push(this.coursesService.getList(this.pageNumber, this.count)
            .subscribe((courses) => {
                this.courses = courses;
                this.filter(this.query);
                this.ref.markForCheck();
            },
            null,
            () => this.loaderService.hide()));
    }
}
