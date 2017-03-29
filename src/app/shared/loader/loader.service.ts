import { Observable, Observer } from 'rxjs/Rx';
import { Injectable } from '@angular/core';

@Injectable()
export class LoaderService {
  public isShown: Observable<boolean>;
  private isShownObserver: Observer<boolean>;

  constructor() {
    this.isShown = new Observable((observer) => this.isShownObserver = observer);
  }

  public show() {
    this.isShownObserver.next(true);
  }

  public hide() {
    this.isShownObserver.next(false);
  }
}
