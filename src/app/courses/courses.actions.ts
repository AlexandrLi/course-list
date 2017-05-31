
import { Action } from '@ngrx/store';
import { Course } from './shared';

export const CoursesActionTypes = {
  ADD_COURSES: 'ADD_COURSES',
  RESET_COURSES: 'RESET_COURSE',
  CREATE_COURSE: 'CREATE_COURSE',
  UPDATE_COURSE: 'UPDATE_COURSE',
  DELETE_COURSE: 'DELETE_COURSE',
  SELECT_COURSE: 'SELECT_COURSE'
};

export class AddCoursesAction implements Action {
  public type: string = CoursesActionTypes.ADD_COURSES;
  constructor(public payload: Course[]) {
  }
}
// tslint:disable-next-line:max-classes-per-file
export class AddCourseAction implements Action {
  public type: string = CoursesActionTypes.CREATE_COURSE;
  constructor(public payload: Course) {
  }
}
// tslint:disable-next-line:max-classes-per-file
export class UpdateCourseAction implements Action {
  public type: string = CoursesActionTypes.UPDATE_COURSE;
  constructor(public payload: Course) {
  }
}
// tslint:disable-next-line:max-classes-per-file
export class DeleteCourseAction implements Action {
  public type: string = CoursesActionTypes.DELETE_COURSE;
  constructor(public payload: number) {
  }
}
// tslint:disable-next-line:max-classes-per-file
export class ResetCoursesAction implements Action {
  public type: string = CoursesActionTypes.RESET_COURSES;
}
// tslint:disable-next-line:max-classes-per-file
export class SelectCourseAction implements Action {
  public type: string = CoursesActionTypes.SELECT_COURSE;
  constructor(public payload: Course) {
  }
}
