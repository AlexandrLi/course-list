import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { Course } from './course.model';

@Injectable()
export class CoursesService {
  private courses: any[] = [];

  constructor(private http: Http) {
  }

  public getList(): Observable<Course[]> {
    let twoWeeksAgo = (new Date()).getTime() - (14 * 24 * 60 * 60 * 1000);
    return this.http.get('http://localhost:3001/courses').map((res) => res.json())
      .map((res: any[]) => res.map((item) => {
        return {
          id: item.id,
          title: item.title,
          duration: item.duration,
          date: new Date(item.date),
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

  public removeItem(id: number): Observable<Response> {
    return this.http.delete(`http://localhost:3001/courses/${id}`);
  }

  private randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }
}
