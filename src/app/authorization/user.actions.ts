import { User } from './';
import { Action } from '@ngrx/store';

export const UserActionTypes = {
  ADD_TOKEN: 'ADD_TOKEN',
  ADD_USER: 'ADD_USER'
};

export class AddTokenAction implements Action {
  public type: string = UserActionTypes.ADD_TOKEN;
  constructor(public payload: string) {
  }
}
// tslint:disable-next-line:max-classes-per-file
export class AddUserAction implements Action {
  public type: string = UserActionTypes.ADD_USER;
  constructor(public payload: User) {
  }
}
