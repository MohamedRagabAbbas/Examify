import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Exam, Student, Teacher } from '../BackEndModels/models/models.module';
import { ServerSideService } from '../server-side.service';
import { ResponseClass } from '../models/response-class/response-class.module';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../models/user/user.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthServiceService } from '../Services/auth-service.service';

@Component({
  selector: 'app-exam-dashboard',
  standalone: true,
  imports: [
      CommonModule,
        FormsModule, 
        ReactiveFormsModule,NgbModule ],
  templateUrl: './exam-dashboard.component.html',
  styleUrl: './exam-dashboard.component.css',
  providers: [ServerSideService]
})
export class ExamDashboardComponent {
    exams:Array<Exam> = [];
    examAndAttempts:Array<ExamAndAttempts> = [];
    formGroup:FormGroup = new FormGroup({});
    isStudent = true;
    constructor(public route: ActivatedRoute,private serverSideService:ServerSideService, private navigator:Router, private toastr: ToastrService,
      private authService:AuthServiceService) 
    { 

      this.allExams(route.snapshot.params['id']);
      this.authService.setCourseId(route.snapshot.params['id']);
      if(this.authService.authResponce.role === '')
      {
        this.navigator.navigate(['/login']);
      }
      else
      {
        if(this.authService.authResponce.role === 'Teacher')
        {
          this.isStudent = false;
        }
        else if (this.authService.authResponce.role === 'Student')
        {
          this.isStudent = true;
        }
      }
      
    }
    allExams(id:number)
    {
      this.serverSideService.getExamsByCourseId(id).subscribe((data)=>{
        let result = new ResponseClass<Array<Exam>>();
        result = data as ResponseClass<Array<Exam>>;
        if(result.status === true)
        {
          this.exams = result.data?? [];
          if(this.isStudent)
          {
            this.exams.forEach(element => {
              this.serverSideService.getAttemptsId(this.authService.studentId, element.id).subscribe((data)=>{
                let result = new ResponseClass<Array<number>>();
                result = data as ResponseClass<Array<number>>;
                if(result.status === true)
                {
                  let examAndAttempt = new ExamAndAttempts();
                  examAndAttempt.exam = element;
                  examAndAttempt.attempts = result.data?? [];
                  this.examAndAttempts.push(examAndAttempt);
                }
                else
                {
                  let examAndAttempt = new ExamAndAttempts();
                  examAndAttempt.exam = element;
                  examAndAttempt.attempts =  [];
                  this.examAndAttempts.push(examAndAttempt);
                }
              });
            });
          }
          else
          {
            this.exams.forEach(element => {
              let examAndAttempt = new ExamAndAttempts();
              examAndAttempt.exam = element;
              examAndAttempt.attempts =  [];
              this.examAndAttempts.push(examAndAttempt);
            });
          }
        }
        else
        {
          // use toaster here to show error message
        }
      });
    }

    updateExam(id:number)
    {
      this.navigator.navigate(['/updateExam/'+id]);
    }

    deleteExam(id:number)
    {
      this.serverSideService.deleteExam(id).subscribe((data)=>{
        let result = new ResponseClass<Exam>();
        result = data as ResponseClass<Exam>;
        if(result.status === true)
        {
          
          this.toastr.success('Exam Deleted Successfully', 'Success');
          this.examAndAttempts = [];
          this.allExams(this.route.snapshot.params['id']);
        }
        else
        {
          this.toastr.error('Exam Not Deleted', 'Error');
          
        }
      });
    }

    addExam()
    {
      this.navigator.navigate(['/GenerateExam/'+this.route.snapshot.params['id']]);
    }

    openExam(id:number)
    {
      console.log(id);
      this.navigator.navigate(['/openExam/'+id]);
    }

    getAttempts(studentId:number, examId:number):Array<number>
    {
      this.serverSideService.getAttemptsId(studentId, examId).subscribe((data)=>{
        let result = new ResponseClass<Array<number>>();
        result = data as ResponseClass<Array<number>>;
        if(result.status === true)
        {
          return result.data?? 0;
        }
        else
        {
          // use toaster here to show error message
          return 0;
        }
      });
      return [];
    }

    showAttempt(id:number)
    {
      this.navigator.navigate(['/showExamGrade/'+id]);
    }
}
export class ExamAndAttempts{
  exam:Exam = new Exam();
  attempts:Array<number> = [];
}