import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ServerSideService } from '../server-side.service';
import { User } from '../models/user/user.module';
import { Course, Student, Teacher } from '../BackEndModels/models/models.module';
import { ResponseClass } from '../models/response-class/response-class.module';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from '../Services/auth-service.service';




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
  courseCode:string = '';
  courses:Array<Course> = new Array<Course>();
  course:Course = new Course;

  constructor(private serverSideService: ServerSideService, private router: Router, private toastr: ToastrService,
    private authService:AuthServiceService  ) 
  {
    if(!this.authService.authResponce.isAuthenticated)
    {
      this.router.navigate(['/login']);
      return;
    }
    if(this.authService.authResponce.role === '')
    {
      this.router.navigate(['/login']);
    }
    else if(this.authService.authResponce.role === 'Teacher')
      {
        this.isStudent = false;
        serverSideService.getCourseByTeacherId(this.authService.teacherId).subscribe((date) => {
            let value2:ResponseClass<Array<Course>> = new ResponseClass<Array<Course>>();
            value2 = date as ResponseClass<Array<Course>>;
            this.courses = value2.data? value2.data : new Array<Course>();
            console.log(this.courses);
        });
      }
    else if (this.authService.authResponce.role === 'Student')
      {
        this.isStudent = true;
        serverSideService.getCourseByStudentId(this.authService.studentId).subscribe((date) => {
          let value3:ResponseClass<Array<Course>> = new ResponseClass<Array<Course>>();
          value3 = date as ResponseClass<Array<Course>>;
          this.courses = value3.data? value3.data : new Array<Course>();
          console.log(this.courses);
        });
    }
  }
  AddCourseTeacher()
  {
    console.log("I am in add course");
    this.router.navigate(['/addCourse']);
  }
  AddCourseStudent()
  {
        this.serverSideService.getStudentId(this.authService.authResponce.id).subscribe(
            (id)=>
          {
             let result = new ResponseClass<number>;
             result = id as ResponseClass<number>;
            this.serverSideService.addCourseToStudent(result.data as number,this.courseCode).subscribe((data) => 
            {
            let value:ResponseClass<Course> = new ResponseClass<Course>();
            value = data as ResponseClass<Course>;
            if(value.status == true)
            {
              this.toastr.success('Course Added Successfully', 'Success').onHidden.subscribe(() =>
              {

                this.serverSideService.getCourseByStudentId(this.authService.studentId).subscribe((date) => {
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
    });});
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

  deleteCourse(codeCourse:string)
  {
    this.course = this.courses.filter(x=>x.code === codeCourse)[0];
    this.serverSideService.deleteCourse(this.course.id).subscribe((data) => 
    {
      let value:ResponseClass<Course> = new ResponseClass<Course>();
      value = data as ResponseClass<Course>;
      if(value.status == true)
      {
        this.toastr.success('Course Deleted Successfully', 'Success');
        if(this.isStudent)
        {
          this.serverSideService.getCourseByStudentId(this.authService.studentId).subscribe((date) => {
            let value3:ResponseClass<Array<Course>> = new ResponseClass<Array<Course>>();
            value3 = date as ResponseClass<Array<Course>>;
            this.courses = value3.data? value3.data : new Array<Course>();
          });
        }
        else if (!this.isStudent)
        {
          this.serverSideService.getCourseByTeacherId(this.authService.teacherId).subscribe((date) => {
            let value2:ResponseClass<Array<Course>> = new ResponseClass<Array<Course>>();
            value2 = date as ResponseClass<Array<Course>>;
            this.courses = value2.data? value2.data : new Array<Course>();
          });
        }
      }
      else
      {
        this.toastr.error('Course Is Not Deleted', 'Error');
      }
    });
  
  }
  
}

// define a new object of id and values:array of courses  
export class obj{
  id: number = 0;
  values: Array<Course> = new Array<Course>();
 }