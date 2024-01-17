import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ServerSideService } from '../server-side.service';
import { User } from '../models/user/user.module';
import { Course, Student, Teacher } from '../BackEndModels/models/models.module';
import { ResponseClass } from '../models/response-class/response-class.module';
import { ToastrService } from 'ngx-toastr';



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
  courseCode:string = '';
  teacher:Teacher = new Teacher();
  student:Student = new Student();
  courses:Array<Course> = new Array<Course>();
  course:Course = new Course;
  constructor(private serverSideService: ServerSideService, private router: Router, private toastr: ToastrService  ) 
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
      else if (this.user.UserRule === 'Student')
      {
        this.isStudent = true;
        const value2 = localStorage.getItem(this.user.UserEmail);
        console.log(value2);
        this.student = value2 ? JSON.parse(value2) : null;
        //console.log(this.student);


        serverSideService.getCourseByStudentId(this.student.id).subscribe((date) => {
          let value3:ResponseClass<Array<Course>> = new ResponseClass<Array<Course>>();
          value3 = date as ResponseClass<Array<Course>>;
          this.courses = value3.data? value3.data : new Array<Course>();
          console.log(this.courses);
        });
        
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

  AddCourseStudent()
  {
    this.serverSideService.addCourseToStudent(this.student.id,this.courseCode).subscribe((data) => 
    {
      let value:ResponseClass<Course> = new ResponseClass<Course>();
      value = data as ResponseClass<Course>;
      if(value.status == true)
      {
        this.toastr.success('Course Added Successfully', 'Success').onHidden.subscribe(() =>
        {
          // update the page to see the new added course

          this.serverSideService.getCourseByStudentId(this.student.id).subscribe((date) => {
            let value3:ResponseClass<Array<Course>> = new ResponseClass<Array<Course>>();
            value3 = date as ResponseClass<Array<Course>>;
            this.courses = value3.data? value3.data : new Array<Course>();
            console.log(this.courses);
          });
        });
      }
      else
      {
        this.toastr.error('Course Not Added', 'Error');
      }
    });
  }
  courseCodeChange(event:any)
  { 
    this.courseCode = event.target.value;
  }

  viewExams(codeCourse:string)
  {
    this.course = this.courses.filter(x=>x.code === codeCourse)[0];
    this.router.navigate([`/examDashboard/${this.course.id.toString()}`]);
  }
  
}

// define a new object of id and values:array of courses  
export class obj{
  id: number = 0;
  values: Array<Course> = new Array<Course>();
 }