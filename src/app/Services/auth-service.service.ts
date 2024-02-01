import { Injectable } from '@angular/core';
import { AuthLogIn, AuthSignUp, AuthenticationResponse } from '../BackEndModels/models/models.module';
import { HttpClient } from '@angular/common/http';
import { ResponseClass } from '../models/response-class/response-class.module';
import { Router } from '@angular/router';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  rootAPI:string = 'https://localhost:7095/api/';
  authResponce:AuthenticationResponse = new AuthenticationResponse();
  studentId:number = 0;
  teacherId:number = 0;
  courseId:number=0;

  constructor(private httpClient:HttpClient,private router: Router,private LoadingService:LoadingService) {
      this.authResponce = JSON.parse(localStorage.getItem('authResponce')?? '{}') as AuthenticationResponse;
      this.studentId = JSON.parse(localStorage.getItem('studentId')?? '0') as number;
      this.teacherId = JSON.parse(localStorage.getItem('teacherId')?? '0') as number;
      this.courseId = JSON.parse(localStorage.getItem('courseId')?? '0') as number;
   }

  signUp(auth:AuthSignUp) 
  {
      return new Promise<void>(resolve=>
      {
        this.httpClient.post(`${this.rootAPI}AuthSignUp/SignUp`,auth).subscribe(
          (data) => {
            this.authResponce = data as AuthenticationResponse;
            localStorage.setItem('authResponce', JSON.stringify(this.authResponce));
            if(this.authResponce.role === 'Student')
            {
              this.httpClient.get(`${this.rootAPI}Student/GetStudentId/${this.authResponce.id}`).subscribe(
                (data) => {
                  let result = new ResponseClass<number>();
                  result = data as ResponseClass<number>;
                  this.studentId = result.data as number;
                  localStorage.setItem('studentId', JSON.stringify(this.studentId));
                });
            }
            else if(this.authResponce.role === 'Teacher')
            {
              this.httpClient.get(`${this.rootAPI}Teacher/GetTeacherId/${this.authResponce.id}`).subscribe(
                (data) => {
                  let result = new ResponseClass<number>();
                  result = data as ResponseClass<number>;
                  this.teacherId = result.data as number;
                  localStorage.setItem('teacherId', JSON.stringify(this.teacherId));
                });
            }
            resolve();
          }
         );
      }) 
  }
   logIn(auth:AuthLogIn)
  {
    
     return new Promise<void>( fun => 
      {
        this.httpClient.post(`${this.rootAPI}AuthSignUp/LogIn`,auth).subscribe(
          (data) => {
            this.authResponce = data as AuthenticationResponse;
            localStorage.setItem('authResponce', JSON.stringify(this.authResponce));
            if(this.authResponce.role === 'Student')
            {
              this.httpClient.get(`${this.rootAPI}Student/GetStudentId/${this.authResponce.id}`).subscribe(
                (data) => {
                  let result = new ResponseClass<number>();
                  result = data as ResponseClass<number>;
                  this.studentId = result.data as number;
                  localStorage.setItem('studentId', JSON.stringify(this.studentId));
                  fun();
                });
            }
            else if(this.authResponce.role === 'Teacher')
            {
              this.httpClient.get(`${this.rootAPI}Teacher/GetTeacherId/${this.authResponce.id}`).subscribe(
                (data) => {
                  let result = new ResponseClass<number>();
                  result = data as ResponseClass<number>;
                  this.teacherId = result.data as number;
                  localStorage.setItem('teacherId', JSON.stringify(this.teacherId));
                  fun();
                });
            }
      });
      });
  }
  logOut()
  {
    this.authResponce = new AuthenticationResponse();
    this.studentId = 0;
    this.teacherId = 0;
    localStorage.removeItem('authResponce');
    localStorage.removeItem('studentId');
    localStorage.removeItem('teacherId');
    localStorage.removeItem('courseId');
    this.router.navigate(['/login']);
  }
  setCourseId(id:number)
  {
    this.courseId = id;
  }

}
