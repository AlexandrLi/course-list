import { SetPathAction } from './../../core/header/breadcrumbs/breadcrumbs.actions';
import * as moment from 'moment';

import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { AppStore } from './../../core/store/app-store';
import { CoursesService, Course } from './../shared';
import { DateValidators, DurationValidators, AuthorsValidators } from './../shared/validators';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})

export class AddCourseComponent implements OnInit, OnDestroy {
  public currentCourse: Course;
  public courseForm: FormGroup;
  public authors: Observable<any[]>;
  constructor(
    private store: Store<AppStore>,
    private _router: Router,
    private aRoute: ActivatedRoute,
    private fb: FormBuilder,

    public coursesService: CoursesService) {
    this.authors = this.coursesService.getAuthorsList();
    this.currentCourse = {
      id: null,
      title: '',
      description: '',
      date: null,
      duration: null,
      authors: [],
      topRated: false
    };
    this.courseForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      date: ['', [Validators.required, DateValidators.shouldMatchFormat]],
      duration: ['', [Validators.required, DurationValidators.shouldContainNumbersOnly]],
      authors: ['', AuthorsValidators.shouldCheckedAtLeastOne]
    });
  }

  public ngOnInit(): void {
    let id = this.aRoute.snapshot.params['id'];
    console.log(id);
    if (id) {
      this.coursesService.getItemById(id)
        .subscribe(
        (result: Course) => {
          this.currentCourse = result;
          this.courseForm.get('date').setValue(this.formatDate(this.currentCourse.date));
          this.courseForm.get('authors').setValue(this.currentCourse.authors);
          this.store.dispatch(new SetPathAction(`>${this.currentCourse.title}`));
        },
        (err) => {
          if (err.status === 404) {
            this._router.navigate(['**']);
          }
        });
    }
  }
  public submit(): void {
    let date = this.courseForm.get('date').value.split('/');
    console.log(date);
    this.currentCourse.date = new Date(date[2], date[1] - 1, date[0]);
    console.log(this.currentCourse);
    if (this.currentCourse.id) {
      this.coursesService.updateItem(this.currentCourse)
        .subscribe(() => this._router.navigate(['courses']));
    } else {
      this.coursesService.createCourse(this.currentCourse)
        .subscribe(() => this._router.navigate(['courses']));
    }
  }

  public formatDate(date) {
    return moment(date).isValid() ? moment(date).format('DD/MM/YYYY') : null;
  }

  public cancel(): void {
    this._router.navigate(['courses']);
  }

  public ngOnDestroy() {
    this.store.dispatch(new SetPathAction(null));
  }
}
