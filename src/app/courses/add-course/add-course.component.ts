import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})

export class AddCourseComponent {

  constructor(private _router: Router) { }

  public cancel() {
    this._router.navigate(['courses']);
  }
}
