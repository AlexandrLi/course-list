import { Directive, ElementRef, Input, AfterContentInit } from '@angular/core';

import { Course } from './';

@Directive({ selector: '[course-highlight]' })
export class CourseHighlightDirective implements AfterContentInit {
  @Input() public currentCourse: Course;

  constructor(private el: ElementRef) {

  }

  public ngAfterContentInit() {
    this.highlight();
  }

  private highlight() {
    let currentDate: Date = new Date();
    currentDate.setHours(0, 0, 0, 0);
    let twoWeeksAgoDate: Date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() - 14
    );
    if (this.currentCourse.date <= currentDate &&
      this.currentCourse.date >= twoWeeksAgoDate) {
      this.el.nativeElement.style['border-color'] = 'green';
    } else if (this.currentCourse.date > currentDate) {
      this.el.nativeElement.style['border-color'] = 'blue';
    }
  }
}
