import { Action } from '@ngrx/store';
import { UserActionTypes } from './user.actions';
import { User } from './';

export function userReducer(state: User, action: Action) {
  switch (action.type) {
    case UserActionTypes.ADD_USER:
      return action.payload;
    default:
      return state;
  }
}
export function userTokenReducer(state: string, action: Action) {
  switch (action.type) {
    case UserActionTypes.ADD_TOKEN:
      return action.payload;
    default:
      return state;
  }
}
