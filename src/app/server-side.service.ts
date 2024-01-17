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
import { CourseInfo } from './models/course-info/course-info.module';
import { Answer, Exam, Grade, Question } from './BackEndModels/models/models.module';
import { ExamInfo } from './models/exam-info/exam-info.module';


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
    return this.httpClient.post(`${this.rootAPI}User/AddUser`,user);
  }

  // Course Section
  addCourse(course:CourseInfo,teacherId:number)
  {
    return this.httpClient.post(`${this.rootAPI}Course/AddCourse/${teacherId}`,course);
  }

  getCourses()
  {
    return this.httpClient.get(`${this.rootAPI}Course/GetCourses`);
  }

  // get course by teacher id
  getCourseByTeacherId(id:number)
  {
    return this.httpClient.get(`${this.rootAPI}Teacher/GetAllCoursesForTeacher/${id}`);
  }

  // get course by student id

  getCourseByStudentId(id:number)
  {
    return this.httpClient.get(`${this.rootAPI}Student/GetAllCoursesForStudent/${id}`);
  }

  // add course to stduent 
  addCourseToStudent(studentId:number,courseCode:string)
  {
    return this.httpClient.post(`${this.rootAPI}Student/AddCourseToStudent/${studentId}/${courseCode}`,null);
  }

  deleteCourse(id:number)
  {
    return this.httpClient.delete(`${this.rootAPI}Course/RemoveCourse/${id}`);
  }

  // get exams by course id
  getExamsByCourseId(id:number)
  {
    return this.httpClient.get(`${this.rootAPI}Course/GetExamsByCourseId/${id}`);
  }

  addExam(exam:Exam)
  {
    return this.httpClient.post(`${this.rootAPI}Exam/AddExam`,exam);
  }

  deleteExam(id:number)
  {
    return this.httpClient.delete(`${this.rootAPI}Exam/RemoveExam/${id}`);
  }

  //add question
  addQuestion(question:Question)
  {
    return this.httpClient.post(`${this.rootAPI}Question/AddQuestion`,question);
  }

  getQuestionsByExamId(id:number)
  {
    return this.httpClient.get(`${this.rootAPI}Question/GetQuestionsByExamId/${id}`);
  }

  deleteQuestion(id:number)
  {
    return this.httpClient.delete(`${this.rootAPI}Question/DeleteQuestion/${id}`);
  }

  updateQuestion(id:number,question:Question)
  {
    return this.httpClient.put(`${this.rootAPI}Question/UpdateQuestion/${id}`,question);
  }

  getQuestionById(id:number)
  {
    return this.httpClient.get(`${this.rootAPI}Question/getQuestionById/${id}`);
  }

  getExamById(id:number)
  {
    return this.httpClient.get(`${this.rootAPI}Exam/GetExam/${id}`);
  }

  updateExam(id:number,exam:ExamInfo)
  {
    console.log(exam);
    console.log(id);

    return this.httpClient.put(`${this.rootAPI}Exam/UpdateExam/${id}`,exam);
  }

  // add answer
  addAnswer(answer:Answer)
  {
    return this.httpClient.post(`${this.rootAPI}Answer/AddAnswer`,answer);
  }

  addGrade(grade:Grade)
  {
    return this.httpClient.post(`${this.rootAPI}Grade/AddGrade`,grade);
  }
}
