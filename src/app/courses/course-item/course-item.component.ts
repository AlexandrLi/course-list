import {
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter
} from '@angular/core';
import { Course } from '../shared/course.model';

@Component({
    selector: 'course-item',
    templateUrl: './course-item.component.html',
    styleUrls: ['./course-item.component.css']
})
export class CourseItemComponent {
    @Input() public course: Course;
    @Output() public delete = new EventEmitter<number>();

    public deleteCourse(): void {
        this.delete.emit(this.course.id);
    }
}
