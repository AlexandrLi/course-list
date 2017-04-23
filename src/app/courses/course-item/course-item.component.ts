import {
    Component,
    Input,
    Output,
    EventEmitter,
    ChangeDetectionStrategy,
} from '@angular/core';
import { Course } from '../shared';

@Component({
    selector: 'course-item',
    templateUrl: './course-item.component.html',
    styleUrls: ['./course-item.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseItemComponent {
    @Input() public course: Course;
    @Output() public remove = new EventEmitter<number>();

    public deleteCourse(): void {
        this.remove.emit(this.course.id);
    }
}
