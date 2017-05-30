import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { AppStore } from './../../core/store/app-store';

@Component({
  selector: 'loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class LoaderComponent {
  public show: Observable<boolean>;

  constructor(private store: Store<AppStore>, private ref: ChangeDetectorRef) {
    this.show = this.store.select('loader');
  }

}
