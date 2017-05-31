import { Action } from '@ngrx/store';
import { BreadcrumbsActionTypes } from './breadcrumbs.actions';

export function breadcrumbsReducer(state: string, action: Action) {
  switch (action.type) {
    case BreadcrumbsActionTypes.SET_PATH:
      return action.payload;
    default:
      return state;
  }
}
