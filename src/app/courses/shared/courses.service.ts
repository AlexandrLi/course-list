import { Injectable } from '@angular/core';
import { Course } from './course.model';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class CoursesService {
  private courses: Course[] =
  [
    {
      id: 1,
      title: 'Mock Course 1',
      duration: 30,
      creationDate: new Date(),
      description:
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Mauris enim arcu, ultrices at feugiat a, mattis vitae urna.`
    },
    {
      id: 2,
      title: 'Mock Course 2',
      duration: 70,
      creationDate: new Date(),
      description:
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Mauris enim arcu, ultrices at feugiat a, mattis vitae urna.`
    },
    {
      id: 3,
      title: 'Mock Course 3',
      duration: 100,
      creationDate: new Date(),
      description:
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Mauris enim arcu, ultrices at feugiat a, mattis vitae urna.`
    }
  ];

  public getList(): Observable<Course[]> {
    return Observable.of(this.courses);
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

}
