import {
  Component,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ToolbarComponent {
  @Output() public query = new EventEmitter<string>();

  constructor(private _router: Router) { }

  public onSubmit(query): void {
    this.query.emit(query);
  }

  public addCourse() {
    this._router.navigate(['courses/add']);
  }
}
