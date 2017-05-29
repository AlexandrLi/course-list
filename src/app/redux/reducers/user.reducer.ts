import { AppStore, INITIAL_STATE } from './../app-store';
import { User } from './../../authorization';
import { ActionReducer, Action } from '@ngrx/store';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export function userReducer(state: AppStore = INITIAL_STATE, action: Action) {
  switch (action.type) {
    case LOGIN:
      return Object.assign({}, action.payload);
    case LOGOUT:
      return {};
    default:
      return state.user;
  }
}
