import { AppStore } from './../core/store/app-store';
import { Action } from '@ngrx/store';
import { UserActionTypes } from './user.actions';

export function userReducer(state: AppStore, action: Action) {
  switch (action.type) {
    case UserActionTypes.ADD_USER:
      return action.payload;
    default:
      return state;
  }
}
export function userTokenReducer(state: AppStore, action: Action) {
  switch (action.type) {
    case UserActionTypes.ADD_TOKEN:
      return action.payload;
    default:
      return state;
  }
}
