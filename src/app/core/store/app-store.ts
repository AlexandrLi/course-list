import { Course } from '../../courses/shared';
import { User } from '../../authorization';

export const INITIAL_STATE: AppStore = {
  user: null,
  userToken: initToken(),
  currentId: null,
  courses: [],
};

export interface AppStore {
  user: User;
  userToken: string;
  currentId: number;
  courses: Course[];
}

function initToken() {
  return localStorage.getItem('AMP-token');
}
