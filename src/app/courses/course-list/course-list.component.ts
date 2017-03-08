import { Component, OnInit } from '@angular/core';
import { Course } from '../shared/course.model';

@Component({
    selector: 'course-list',
    templateUrl: 'course-list.component.html',
    styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

    public courses: Course[];
    public input: string = '';

    constructor() {
        this.courses = [];
    }

    public ngOnInit() {
        this.courses = [
            {
                id: 1,
                title: 'Mock Course 1',
                duration: 30,
                creationDate: new Date(),
                description: 'dummy course description 1'
            },
            {
                id: 2,
                title: 'Mock Course 2',
                duration: 70,
                creationDate: new Date(),
                description: 'dummy course description 2'
            },
            {
                id: 3,
                title: 'Mock Course',
                duration: 100,
                creationDate: new Date(),
                description: 'dummy course description 3'
            },
        ];
    }

    public find() {
        console.log(this.input);
    }

    public removeCourse(removeObj: { id: number }): void {
        console.log(removeObj);
        this.courses = this.courses.filter((course: Course) => {
            return course.id !== removeObj.id;
        });
    }
}
