import { Course } from '../../courses/shared';
import { User } from '../../authorization';

export const INITIAL_STATE: AppStore = {
  loading: false,
  user: null,
  userToken: initToken(),
  currentId: null,
  courses: []
};

export interface AppStore {
  user: User;
  userToken: string;
  currentId: number;
  courses: Course[];
  loading: boolean;
}

function initToken() {
  return localStorage.getItem('AMP-token');
}
