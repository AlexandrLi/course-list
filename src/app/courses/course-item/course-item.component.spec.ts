import { Router } from '@angular/router';
import { HttpModule } from '@angular/http';
import { DurationPipe } from './../shared/duration.pipe';
import {
    async, ComponentFixture, TestBed
} from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { CourseItemComponent } from './course-item.component';
import { Course } from './../shared/course.model';
import { DatePipe } from '@angular/common';

describe('TestSuite for CourseItemComponent', () => {

    let comp: CourseItemComponent;
    let expectedCourse: Course;
    let fixture: ComponentFixture<CourseItemComponent>;
    let courseEl: DebugElement;
    let courseEvents: DebugElement;

    let mockRouter;

    // async beforeEach
    beforeEach(async(() => {
        mockRouter = {
            navigate: jasmine.createSpy('navigate')
        };
        TestBed.configureTestingModule({
            declarations: [CourseItemComponent, DurationPipe],
            providers: [
                { provide: Router, useValue: mockRouter }
            ]
        })
            .compileComponents(); // compile template and css
    }));

    // synchronous beforeEach
    beforeEach(() => {
        fixture = TestBed.createComponent(CourseItemComponent);
        comp = fixture.componentInstance;
        courseEl = fixture.debugElement.query(By.css('div:nth-child(1)'));
        courseEvents = fixture.debugElement.query(By.css('div:nth-child(2)'));

        // pretend that it was wired to something that supplied a hero
        expectedCourse = {
            id: 4980,
            title: 'magna excepteur aute deserunt',
            description: 'Sunt culpa officia minim commodo eiusmod irure.',
            topRated: true,
            date: new Date(2017, 5, 15),
            authors: [
                {
                    id: 8413,
                    firstName: 'Greta',
                    lastName: 'Richardson'
                },
                {
                    id: 7458,
                    firstName: 'Deana',
                    lastName: 'Bruce'
                },
                {
                    id: 5508,
                    firstName: 'Patsy',
                    lastName: 'Bright'
                }
            ],
            duration: 207
        };
        comp.course = expectedCourse;
        fixture.detectChanges(); // trigger initial data binding
    });

    it('should display course title', () => {
        const expectedPipedName = expectedCourse.title.toUpperCase();
        expect(courseEl.query(By.css('p:nth-child(1)')).nativeElement.textContent)
            .toContain(expectedPipedName);
    });

    it('should display course duration', () => {
        let durationPipe = new DurationPipe();
        const expectedPipedDuration = durationPipe.transform(expectedCourse.duration);

        expect(courseEl.query(By.css('.duration')).nativeElement.textContent)
            .toContain(expectedPipedDuration);
    });

    it('should decorate with .star class if course is top rated', () => {
        let courseRateEl = courseEl.query(By.css('.star'));
        if (expectedCourse.topRated) {
            expect(courseRateEl).toBeDefined();
        }
    });

    it('should not decorate with .star class if course is not top rated', () => {
        let courseRateEl = courseEl.query(By.css('.star'));
        if (!expectedCourse.topRated) {
            expect(courseRateEl).toBeUndefined();
        }
    });

    it('should display course date', () => {
        let datePipe = new DatePipe('en-US');
        let expectedPipedDate = datePipe.transform(expectedCourse.date);
        let courseDateEl = courseEl.query(By.css('.date')).nativeElement.textContent;
        expect(courseDateEl).toContain(expectedPipedDate);

    });

    it('should display course description', () => {
        expect(courseEl.query(By.css('.description')).nativeElement.textContent)
            .toContain(expectedCourse.description);
    });

    it('should navigate with params when edit button pressed', () => {
        let editButton = courseEvents.query(By.css('button:nth-child(1)')).nativeElement;
        editButton.dispatchEvent(new Event('click'));
        fixture.detectChanges();
        expect(mockRouter.navigate).toHaveBeenCalledWith(['courses', expectedCourse.id]);
    });

    it('should emit delete event when delete button pressed ', () => {
        spyOn(comp.remove, 'emit');
        let deleteButton = courseEvents.query(By.css('button:nth-child(2)')).nativeElement;
        deleteButton.dispatchEvent(new Event('click'));
        fixture.detectChanges();
        expect(comp.remove.emit).toHaveBeenCalledWith(expectedCourse.id);
    });
});
