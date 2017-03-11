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
export class CourseItemComponent implements OnInit {
    @Input() public course: Course;
    @Output() public delete = new EventEmitter<{ id: number }>();

    constructor() { }

    public ngOnInit() { }

    public deleteCourse(): void {
        this.delete.emit({ id: this.course.id });
    }
}
