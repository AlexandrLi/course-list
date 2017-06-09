import { By } from '@angular/platform-browser';
import { CourseHighlightDirective } from './course-highlight.directive';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';

@Component({
  template: `
  <li course-highlight [currentCourse]='courseOne'>Course 1</li>
  <li course-highlight [currentCourse]='courseTwo'>Course 2</li>
  <li course-highlight [currentCourse]='courseThree'>Course 3</li>`
})
class TestComponent {
  public courseOne = {
    id: 1,
    title: 'Course One',
    description: 'Desc one',
    topRated: false,
    date: new Date('2017-06-05T23:17:58+00:00'),
    duration: 59
  };
  public courseTwo = {
    id: 1,
    title: 'Course Two',
    description: 'Desc two',
    topRated: true,
    date: new Date('2017-06-20T10:27:58+00:00'),
    duration: 100
  };
  public courseThree = {
    id: 1,
    title: 'Course Three',
    description: 'Desc three',
    topRated: false,
    date: new Date('2017-03-10T13:17:58+00:00'),
    duration: 250
  };
}

describe('TestSuite for CourseHighlightDirective', () => {

  let comp: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let de: DebugElement[];
  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [CourseHighlightDirective, TestComponent]
    })
      .createComponent(TestComponent);
    fixture.detectChanges(); // initial binding
    de = fixture.debugElement.queryAll(By.directive(CourseHighlightDirective));
  });

  it('should have three course-highlighted elements', () => {
    expect(de.length).toBe(3);
  });

  it('should set border-color to green on first li element ', () => {
    const borderColor = de[0].nativeElement.style['borderColor'];
    expect(borderColor).toBe('green');
  });

  it('should set border-color to blue on second li element ', () => {
    const borderColor = de[1].nativeElement.style['borderColor'];
    expect(borderColor).toBe('blue');
  });

  it('should not change border-color on third li element', () => {
    const borderColor = de[2].nativeElement.style['borderColor'] = 'black';
    expect(borderColor).toBe('black');
  });
});
