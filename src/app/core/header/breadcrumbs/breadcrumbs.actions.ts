import { Action } from '@ngrx/store';

export const BreadcrumbsActionTypes = {
  SET_PATH: 'SET_PATH',
};

export class SetPathAction implements Action {
  public type: string = BreadcrumbsActionTypes.SET_PATH;
  constructor(public payload: string) {
  }
}
