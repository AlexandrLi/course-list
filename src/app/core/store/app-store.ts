import { Course } from '../../courses/shared';
import { User } from '../../authorization';

export const INITIAL_STATE: AppStore = {
  loading: false,
  user: null,
  userToken: initToken(),
  courses: [],
  breadcrumbs: null
};

export interface AppStore {
  user: User;
  userToken: string;
  breadcrumbs: string;
  courses: Course[];
  loading: boolean;
}

function initToken() {
  return localStorage.getItem('AMP-token');
}
