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
  private baseUrl: string = 'http://localhost:3004';

  constructor(private http: AuthorizedHTTPService) {
  }

  public getListByQuery(query: string, pageNumber: number, count: number) {
    let requestOptions: RequestOptions = new RequestOptions();
    let request: Request;
    let urlParams: URLSearchParams = new URLSearchParams();
    urlParams.set('q', query);
    urlParams.set('_page', pageNumber.toString());
    urlParams.set('_limit', count.toString());
    requestOptions.url = `${this.baseUrl}/courses`;
    requestOptions.method = RequestMethod.Get;
    requestOptions.search = urlParams;

    request = new Request(requestOptions);

    return this.http.request(request)
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
      }));
  }

  public getList(pageNumber: number, count: number): Observable<Course[]> {
    let twoWeeksAgo = (new Date()).getTime() - (14 * 24 * 60 * 60 * 1000);
    return this.http.get(`${this.baseUrl}/courses?_page=${pageNumber}&_limit=${count}`)
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
