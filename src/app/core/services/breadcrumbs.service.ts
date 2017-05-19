import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs/Rx';

@Injectable()
export class BreadcrumbsService {

  public path: Observable<string>;

  private pathSubject: BehaviorSubject<string>;

  constructor() {
    this.pathSubject = new BehaviorSubject('');
    this.path = this.pathSubject.asObservable();
  }

  public setPath(path) {
    this.pathSubject.next(`>${path}`);
  }

  public clearPath() {
    this.pathSubject.next('');
  }
}
