import { Injectable } from '@angular/core';
import {
  Request,
  Response,
  RequestOptions,
  RequestMethod,
  URLSearchParams
} from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { AuthorizedHTTPService } from './../../core/services';
import { Course } from './course.model';

@Injectable()
export class CoursesService {
  private baseUrl: string = 'http://amt-server.herokuapp.com';

  constructor(private http: AuthorizedHTTPService) {
  }

  public getCourseList(pageNumber: number, count: number, query: string): Observable<Course[]> {
    let twoWeeksAgo = (new Date()).getTime() - (14 * 24 * 60 * 60 * 1000);
    return this.http.get(`${this.baseUrl}/courses?page=${pageNumber}&limit=${count}&query=${query}`)
      .map((res: Response) => res.json())
      .map((res: any[]) => res.map((item) => {
        return {
          id: item.id,
          title: item.name,
          duration: item.length,
          date: new Date(item.date),
          description: item.description,
          topRated: item.isTopRated
        };
      }))
      .map((courses: Course[]) => courses.filter((course) => course.date.getTime() >= twoWeeksAgo));
  }

  public getAuthorsList(): Observable<any[]> {
    return this.http.get(`${this.baseUrl}/authors`)
      .map((res: Response) => res.json());
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
    return this.http.delete(`${this.baseUrl}/courses/${id}`);
  }

}
