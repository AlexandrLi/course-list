import {
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter,
    ChangeDetectionStrategy,
    NgZone
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
    @Output() public delete = new EventEmitter<number>();

    constructor(private _ngZone: NgZone) {
        _ngZone.onStable.subscribe(() => console.log('stable ' + new Date().toTimeString()));
        _ngZone.onUnstable.subscribe(() => console.log('unstable ' + new Date().toTimeString()));
    }

    public deleteCourse(): void {
        this.delete.emit(this.course.id);
    }
}
