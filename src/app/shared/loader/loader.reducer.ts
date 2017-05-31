import { Action } from '@ngrx/store';
import { LoaderActionTypes } from './';

export function loaderReducer(state: boolean, action: Action) {
  switch (action.type) {
    case LoaderActionTypes.SHOW:
    case LoaderActionTypes.HIDE:
      return action.payload;
    default:
      return state;
  }
}
