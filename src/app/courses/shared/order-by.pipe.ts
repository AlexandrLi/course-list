import { Pipe, PipeTransform } from '@angular/core';

import { Course } from './course.model';

@Pipe({
  name: 'myOrderBy'
})

export class OrderByPipe implements PipeTransform {
  public transform(items: Course[], order: string): Course[] {
    return items.sort((item1: Course, item2: Course) => {
      if (order === 'desc') {
        return item2.date.getTime() - item1.date.getTime();
      } else {
        return item1.date.getTime() - item2.date.getTime();
      }
    });
  }
}
