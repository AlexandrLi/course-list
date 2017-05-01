import { Observable } from 'rxjs/Rx';
import { CoursesService } from './../shared';
import { DateValidators, DurationValidators, AuthorsValidators } from './../shared/validators';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})

export class AddCourseComponent {
  public courseForm: FormGroup;
  public authors: Observable<any[]>;
  constructor(
    private _router: Router,
    private fb: FormBuilder,
    public coursesService: CoursesService) {
    this.authors = this.coursesService.getAuthorsList();
    this.courseForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      date: ['', [Validators.required, DateValidators.shouldMatchFormat]],
      duration: ['0', [Validators.required, DurationValidators.shouldContainNumbersOnly]],
      authors: ['', AuthorsValidators.shouldCheckedAtLeastOne]
    });
  }

  public submit(): void {
    console.log(this.courseForm);
  }

  public cancel(): void {
    this._router.navigate(['courses']);
  }
}
