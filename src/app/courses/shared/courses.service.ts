import { Injectable } from '@angular/core';
import { Course } from './course.model';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class CoursesService {
  private courses: Course[] = [];

  constructor() {
    for (let i = 0; i < 5; i++) {
      this.courses.push({
        id: i,
        title: `Mock Course ${i}`,
        duration: Math.floor(Math.random() * 100) + 1,
        creationDate: this.randomDate(new Date(2017, 1, 15), new Date(2017, 3, 25)),
        description:
        `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Mauris enim arcu, ultrices at feugiat a, mattis vitae urna.`,
        topRated: Math.random() > 0.5
      });

    }
  }

  public getList(): Observable<Course[]> {
    return Observable.of(this.courses).delay(1000);
  }

  public createCourse(): Observable<Course> {
    return null;
  }

  public getItemById(id: number): Observable<Course> {
    return null;
  }

  public updateItem(course: Course): Observable<Course> {
    return null;
  }

  public removeItem(id: number): Observable<boolean> {
    let success = false;
    this.courses = this.courses.filter((course: Course) => {
      success = success || course.id === id;
      return course.id !== id;
    });
    return Observable.of(success);
  }

  private randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }
}
