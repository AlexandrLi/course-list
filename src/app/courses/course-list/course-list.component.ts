import { Component, OnInit } from '@angular/core';
import { Course } from '../shared/course.model';

@Component({
    selector: 'course-list',
    templateUrl: 'course-list.component.html',
    styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

    public courses: Course[];
    public query: string = '';

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
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris enim arcu, ultrices at feugiat a, mattis vitae urna.'
            },
            {
                id: 2,
                title: 'Mock Course 2',
                duration: 70,
                creationDate: new Date(),
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris enim arcu, ultrices at feugiat a, mattis vitae urna.'
            },
            {
                id: 3,
                title: 'Mock Course 3',
                duration: 100,
                creationDate: new Date(),
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris enim arcu, ultrices at feugiat a, mattis vitae urna.'
            },
        ];
    }

    public find() {
        console.log(this.query);
    }

    public removeCourse(removeObj: { id: number }): void {
        console.log(removeObj);
        this.courses = this.courses.filter((course: Course) => {
            return course.id !== removeObj.id;
        });
    }
}
