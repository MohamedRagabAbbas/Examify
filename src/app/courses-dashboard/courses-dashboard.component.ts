import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ServerSideService } from '../server-side.service';
import { User } from '../models/user/user.module';
import { Course, Student, Teacher } from '../BackEndModels/models/models.module';
import { ResponseClass } from '../models/response-class/response-class.module';


@Component({
  selector: 'app-courses-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './courses-dashboard.component.html',
  styleUrl: './courses-dashboard.component.css',
  providers: [ServerSideService]
})
export class CoursesDashboardComponent {
  isStudent = true;
  user:User = new User();
  teacher:Teacher = new Teacher();
  student:Student = new Student();
  courses:Array<Course> = new Array<Course>();
  constructor(private serverSideService: ServerSideService, private router: Router  ) 
  {
    const value = localStorage.getItem('user');
    this.user = value ? JSON.parse(value) : null;
    //console.log("I am in dashboard ");
    //console.log(this.user);

    if(this.user.UserRule === '')
    {
      this.router.navigate(['/login']);
    }
    else
    {
      if(this.user.UserRule === 'Teacher')
      {
        //console.log("I am in dashboard ");
        this.isStudent = false;
        const value1 = localStorage.getItem(this.user.UserEmail);
        this.teacher = value1 ? JSON.parse(value1) : null;

        serverSideService.getCourseByTeacherId(this.teacher.id).subscribe((date) => {
          let value2:ResponseClass<Array<Course>> = new ResponseClass<Array<Course>>();
          value2 = date as ResponseClass<Array<Course>>;
          this.courses = value2.data? value2.data : new Array<Course>();
          console.log(this.courses);
        });
      }


      else
      {
        this.isStudent = true;
        const value2 = localStorage.getItem(this.user.UserEmail);
        this.student = value2 ? JSON.parse(value2) : null;
      }




    }

    console.log(this.courses);
  }

  logout()
  {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  AddCourseTeacher()
  {
    console.log("I am in add course");
    this.router.navigate(['/addCourse']);
  }



 
  }

  
  


// define a new object of id and values:array of courses  
export class obj{
  id: number = 0;
  values: Array<Course> = new Array<Course>();
 }