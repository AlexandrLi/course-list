import { Course } from './../courses/shared';
import { User } from './../authorization';

export const INITIAL_STATE: AppStore = {
  user: new User(),
  courses: [],
  currentCourse: null
};

export interface AppStore {
  user: User;
  courses: Course[];
  currentCourse: Course;
}
