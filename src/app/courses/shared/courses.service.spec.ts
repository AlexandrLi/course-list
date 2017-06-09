import { AuthorizedHTTPService } from './../../core/services/authorized-http.service';
import { CoursesService } from './courses.service';
import { Injectable, ReflectiveInjector } from '@angular/core';
import { async, fakeAsync, tick } from '@angular/core/testing';
import { BaseRequestOptions, ConnectionBackend, Http, RequestOptions } from '@angular/http';
import { Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

const AUTHOR_ONE = { id: 1, firstName: 'Author', lastName: 'One' };
const AUTHOR_TWO = { id: 2, firstName: 'Author', lastName: 'Two' };
const AUTHOR_THREE = { id: 3, firstName: 'Author', lastName: 'Three' };
const COURSE_ONE = {
  id: 1,
  name: 'Course One',
  description: 'Desc one',
  isTopRated: false,
  date: '2017-11-05T23:17:58+00:00',
  authors: [AUTHOR_ONE],
  length: 59
};
const COURSE_TWO = {
  id: 1,
  name: 'Course Two',
  description: 'Desc two',
  isTopRated: true,
  date: '2017-01-15T10:27:58+00:00',
  authors: [AUTHOR_ONE, AUTHOR_TWO],
  length: 100
};
const COURSE_THREE = {
  id: 1,
  name: 'Course Three',
  description: 'Desc three',
  isTopRated: false,
  date: '2016-10-25T13:17:58+00:00',
  authors: [AUTHOR_ONE, AUTHOR_TWO, AUTHOR_THREE],
  length: 250
};

const NEW_COURSE = {
  id: null,
  name: 'New Course',
  description: 'Desc',
  isTopRated: false,
  date: '2017-07-15T08:17:58+00:00',
  authors: [AUTHOR_ONE, AUTHOR_THREE],
  length: 12
};

describe('TestSuite for CoursesService', () => {
  beforeEach(() => {
    this.injector = ReflectiveInjector.resolveAndCreate([
      Http,
      { provide: ConnectionBackend, useClass: MockBackend },
      { provide: RequestOptions, useClass: BaseRequestOptions },
      { provide: AuthorizedHTTPService, useClass: Http },
      CoursesService
    ]);
    this.coursesService = this.injector.get(CoursesService);
    this.backend = this.injector.get(ConnectionBackend) as MockBackend;
    this.backend.connections.subscribe((connection: any) => this.lastConnection = connection);
  });

  it('getAuthorsList() should return a list of authors', fakeAsync(() => {
    let result = [];
    this.coursesService.getAuthorsList().subscribe((authors) => {
      result = authors;
    });

    this.lastConnection.mockRespond(new Response(new ResponseOptions({
      body: JSON.stringify([AUTHOR_ONE, AUTHOR_TWO, AUTHOR_THREE])
    })));
    tick();

    expect(result.length).toBe(3);
    expect(result[0]).toEqual(AUTHOR_ONE);
    expect(result[1]).toEqual(AUTHOR_TWO);
    expect(result[2]).toEqual(AUTHOR_THREE);
  }));

  it('getCourseList() should return a list of courses', fakeAsync(() => {
    let result = [];
    let start = 1;
    let end = 5;
    let query = '';
    this.coursesService.getCourseList(start, end, query).subscribe((courses) => {
      result = courses;
    });

    this.lastConnection.mockRespond(new Response(new ResponseOptions({
      body: JSON.stringify([COURSE_ONE, COURSE_TWO, COURSE_THREE])
    })));
    tick();

    expect(result.length).toBe(3);
    expect(result[0]).toEqual(mapCourseFromResponse(COURSE_ONE));
    expect(result[1]).toEqual(mapCourseFromResponse(COURSE_TWO));
    expect(result[2]).toEqual(mapCourseFromResponse(COURSE_THREE));
  }));

  it('createCourse() should create course and return an id of created course', fakeAsync(() => {
    let result = null;
    let mockId = 1000;
    this.coursesService.createCourse(NEW_COURSE).subscribe((resp) => {
      result = resp;
    });

    this.lastConnection.mockRespond(new Response(new ResponseOptions({
      body: JSON.stringify(mockId)
    })));
    tick();

    expect(result).toEqual(mockId);
  }));

  it('getItemById() should return course item with required id', fakeAsync(() => {
    let result = null;
    let requiredId = COURSE_ONE.id;
    this.coursesService.getItemById(requiredId).subscribe((resp) => {
      result = resp;
    });

    this.lastConnection.mockRespond(new Response(new ResponseOptions({
      body: JSON.stringify(COURSE_ONE)
    })));
    tick();

    expect(result).toEqual(mapCourseFromResponse(COURSE_ONE));
  }));

  it('updateItem() should return modified course', fakeAsync(() => {
    let result = null;
    let modifiedCourse = COURSE_ONE;
    modifiedCourse.description = 'Modified';
    modifiedCourse.isTopRated = true;
    this.coursesService.updateItem(modifiedCourse).subscribe((resp) => {
      result = resp;
    });

    this.lastConnection.mockRespond(new Response(new ResponseOptions({
      body: JSON.stringify(modifiedCourse)
    })));
    tick();

    expect(result).toEqual(modifiedCourse);
  }));

});

function mapCourseFromResponse(response) {
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
