import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TeacherInfo } from './models/teacher-info/teacher-info.module';
import { StudentInfo } from './models/student-info/student-info.module';
import { User } from './models/user/user.module';
import { ResponseClass } from './models/response-class/response-class.module';
import { Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root', // Specify providedIn: 'root' to make it a singleton
})
export class ServerSideService {

  rootAPI:string = 'https://localhost:7095/api/';
  api:string = 'https://localhost:7095/api/' + 'Teacher/AddTeacher';

  user:User= new User();

  constructor(private httpClient:HttpClient, private navigator:Router) 
  { 

  }
  getTeachers()
  {
     this.httpClient.get(this.rootAPI).subscribe((data)=>{
      console.log(data);
  });}

  //SignUp
  addTeacher(teacher:TeacherInfo)
  {
     return this.httpClient.post(`${this.rootAPI}Teacher/AddTeacher`,teacher)
  }

  addStudent(stdeunt:StudentInfo)
  {
    return this.httpClient.post(`${this.rootAPI}Student/AddStudent`,stdeunt);
  }

  // login
  studentLogin(email:string,password:string)
  {
    return this.httpClient.get(`${this.rootAPI}Student/Login/${email}/${password}`);
    /*.subscribe
    ((data)=>{
      var result: ResponseClass<StudentInfo> = new ResponseClass<StudentInfo>;
      result = data as ResponseClass<StudentInfo>;
      if(result.status===true)
      {
        //use toster here to show success message
        this.user.Id = 0;
        this.user.UserEmail = result.data?.email ?? '';
        this.user.UserPassword = result.data?.password ?? '';
        this.user.UserRule = 'Student';
        this.addUser(this.user);
      }
    });*/
  }

  teacherLogin(email:string,password:string)
  {
     return this.httpClient.get(`${this.rootAPI}Teacher/Login/${email}/${password}`);
     /*.subscribe
    ((data)=>{
      let result: ResponseClass<TeacherInfo> = new ResponseClass<TeacherInfo>;
      result = data as ResponseClass<TeacherInfo>;
      if(result.status==true)
      {
        this.user.Id = 0;
        this.user.UserEmail = result.data?.email ?? '';
        this.user.UserPassword = result.data?.password ?? '';
        this.user.UserRule = 'Teacher';
        this.addUser(this.user);
      }
    });*/
  }


  // Add User
  addUser(user:User)
  {

    
    localStorage.setItem('user', JSON.stringify(user));
    return this.httpClient.post(`${this.rootAPI}User/AddUser`,user);
  }
}
