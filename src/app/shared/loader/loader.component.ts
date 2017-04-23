import {
  Component,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { Subscription } from 'rxjs/Rx';

import { LoaderService } from './loader.service';

@Component({
  selector: 'loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class LoaderComponent implements OnDestroy {
  public show: boolean;
  private subscription: Subscription;

  constructor(private _loaderService: LoaderService, private ref: ChangeDetectorRef) {
    this.subscription = this._loaderService.isShown
      .subscribe((isShown) => {
        this.show = isShown;
        this.ref.markForCheck();
      });
  }

  public ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
