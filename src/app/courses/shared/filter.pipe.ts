import { Course } from './course.model';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myFilter'
})

export class FilterPipe implements PipeTransform {
  public transform(list: Course[], query: string): Course[] {
    return list.filter((course) => course.title.includes(query));
  }
}
