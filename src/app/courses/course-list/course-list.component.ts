import { Router } from '@angular/router';
import { AuthorizationService } from './../../core/authorization.service';
import { CoursesService } from './../shared/courses.service';
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
    AfterContentInit
} from '@angular/core';
import { Course } from '../shared/course.model';

@Component({
    selector: 'course-list',
    templateUrl: 'course-list.component.html',
    styleUrls: ['./course-list.component.css']
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
    public query: string = '';

    constructor(
        private coursesService: CoursesService,
        private authService: AuthorizationService,
        private router: Router) {
        this.courses = [];
    }

    public find(): void {
        console.log(this.query);
    }

    public removeCourse(id: number): void {
        if (confirm('Do you really want to delete this course?')) {
            if (this.coursesService.removeItem(id)) {
                this.courses = this.coursesService.getList();
            }
        }
    }

    public ngOnInit(): void {
        if (!this.authService.isAuthenticated()) {
            this.router.navigate(['login']);
        }
        this.courses = this.coursesService.getList();
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
