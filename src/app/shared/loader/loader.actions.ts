import { Action } from '@ngrx/store';

export const LoaderActionTypes = {
  SHOW: 'SHOW',
  HIDE: 'HIDE'
};

export class ShowLoaderAction implements Action {
  public type: string = LoaderActionTypes.SHOW;
  public payload = true;
}
// tslint:disable-next-line:max-classes-per-file
export class HideLoaderAction implements Action {
  public type: string = LoaderActionTypes.HIDE;
  public payload = false;
}
