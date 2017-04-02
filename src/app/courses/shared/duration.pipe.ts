import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myDuration'
})

export class DurationPipe implements PipeTransform {
  public transform(duration: number): string {
    if (duration < 60) {
      return `${duration} min`;
    } else {
      return `${Math.trunc(duration / 60)} h ${duration % 60} min`;
    }
  }
}
