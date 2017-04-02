import {
  Component,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ToolbarComponent {
  @Output() public query = new EventEmitter<string>();

  public onSubmit(query): void {
    this.query.emit(query);
  }
}
