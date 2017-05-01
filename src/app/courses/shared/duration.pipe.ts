import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myDuration'
})

export class DurationPipe implements PipeTransform {
  public transform(duration: number): string {
    if (duration) {
      // tslint:disable-next-line:max-line-length
      return duration < 60 ? `${duration} min` : `${Math.trunc(duration / 60)} h ${duration % 60} min`;
    } else {
      return '';
    }
  }
}
