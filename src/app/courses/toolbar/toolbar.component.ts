import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ToolbarComponent {
  public query: string = '';

  public find(): void {
    console.log(this.query);
  }
}
