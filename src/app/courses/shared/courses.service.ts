import { Injectable } from '@angular/core';
import {
  Request,
  Response,
  RequestOptions,
  RequestMethod,
  URLSearchParams,
  Headers
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

  public createCourse(course: Course): Observable<Course> {
    let requestOptions: RequestOptions = new RequestOptions({ headers: new Headers() });
    let request: Request;

    requestOptions.url = `${this.baseUrl}/courses`;
    requestOptions.method = RequestMethod.Post;
    requestOptions.headers.append('Content-Type', 'application/json');
    requestOptions.body = JSON.stringify(this.mapCourseForPost(course));

    request = new Request(requestOptions);

    return this.http.request(request)
      .map((response: Response) => response.json());
  }

  public getItemById(id: number): Observable<Course> {
    return this.http.get(`${this.baseUrl}/courses/${id}`)
      .map((res: Response) => res.json())
      .map((res) => this.mapCourseFromResponse(res));
  }

  public updateItem(course: Course): Observable<Course> {
    let requestOptions: RequestOptions = new RequestOptions({ headers: new Headers() });
    let request: Request;

    requestOptions.url = `${this.baseUrl}/courses/${course.id}`;
    requestOptions.method = RequestMethod.Put;
    requestOptions.headers.append('Content-Type', 'application/json');
    requestOptions.body = JSON.stringify(this.mapCourseForPost(course));

    request = new Request(requestOptions);

    return this.http.request(request)
      .map((response: Response) => response.json());
  }

  public removeItem(id: number): Observable<Response> {
    return this.http.delete(`${this.baseUrl}/courses/${id}`);
  }

  private mapCourseFromResponse(response): Course {
    return {
      id: response.id,
      title: response.name,
      duration: response.length,
      date: new Date(response.date),
      description: response.description,
      authors: response.authors,
      topRated: response.isTopRated
    };
  }

  private mapCourseForPost(course: Course) {
    return {
      id: course.id,
      name: course.title,
      description: course.description,
      isTopRated: course.topRated,
      date: course.date,
      authors: course.authors,
      length: course.duration
    };
  }
}
