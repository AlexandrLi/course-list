import { Injectable } from '@angular/core';
import { Course } from './course.model';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class CoursesService {
  private courses: any[] = [];

  constructor() {
    for (let i = 0; i < 10; i++) {
      this.courses.push({
        id: i,
        name: `Mock Course ${i}`,
        duration: Math.floor(Math.random() * 100) + 1,
        date: this.randomDate(new Date(2017, 1, 15), new Date(2017, 4, 25)),
        description:
        `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Mauris enim arcu, ultrices at feugiat a, mattis vitae urna.`,
        topRated: Math.random() > 0.5
      });
    }
  }

  public getList(): Observable<Course[]> {
    let twoWeeksAgo = (new Date()).getTime() - (14 * 24 * 60 * 60 * 1000);
    return Observable.of(this.courses)
      .map((res: any[]) => res.map((item) => {
        return {
          id: item.id,
          title: item.name,
          duration: item.duration,
          date: item.date,
          description: item.description,
          topRated: item.topRated
        };
      }))
      .map((courses: Course[]) => courses.filter((course) => course.date.getTime() >= twoWeeksAgo))
      .delay(500);
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
