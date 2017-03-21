import { Injectable } from '@angular/core';
import { Course } from './course.model';

@Injectable()
export class CoursesService {
  private courses: Course[] =
  [
    {
      id: 1,
      title: 'Mock Course 1',
      duration: 30,
      creationDate: new Date(),
      description:
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Mauris enim arcu, ultrices at feugiat a, mattis vitae urna.`
    },
    {
      id: 2,
      title: 'Mock Course 2',
      duration: 70,
      creationDate: new Date(),
      description:
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Mauris enim arcu, ultrices at feugiat a, mattis vitae urna.`
    },
    {
      id: 3,
      title: 'Mock Course 3',
      duration: 100,
      creationDate: new Date(),
      description:
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Mauris enim arcu, ultrices at feugiat a, mattis vitae urna.`
    }
  ];

  public getList(): Course[] {
    return this.courses;
  }

  public createCourse(): Course {
    return null;
  }

  public getItemById(id: number): Course {
    return null;
  }

  public updateItem(course: Course): Course {
    return null;
  }

  public removeItem(id: number): boolean {
    let success = false;
    this.courses = this.courses.filter((course: Course) => {
      success = success || course.id === id;
      return course.id !== id;
    });
    return success;
  }

}
