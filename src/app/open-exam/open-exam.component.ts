import { Component, Input } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Answer, Attempt, Exam, Grade, Question, Student, StudentAttempts } from '../BackEndModels/models/models.module';
import { ServerSideService } from '../server-side.service';
import { CommonModule } from '@angular/common';
import { ResponseClass } from '../models/response-class/response-class.module';
import { ExamInfo } from '../models/exam-info/exam-info.module';
import { User } from '../models/user/user.module';
import { Router } from '@angular/router';
import { AuthServiceService } from '../Services/auth-service.service';
import { ExamService } from '../Services/exam.service';
import { TimeFormatPipe } from '../time-format-pipe/time-format-pipe.module';



@Component({
  
  selector: 'app-open-exam',
  standalone: true,
  imports: [
    TimeFormatPipe,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,],
    
  templateUrl: './open-exam.component.html',
  styleUrl: './open-exam.component.css',
  providers: [ServerSideService],
  
})
export class OpenExamComponent {

  questions:Array<Question> = new Array<Question>();
  answer:Answer = new Answer();
  totalGrade:number = 0;
  outOf:number=0;
  Grade:Grade = new Grade();
  attempt:Attempt = new Attempt();
  studentAttempts:StudentAttempts = new StudentAttempts();

  constructor(public route: ActivatedRoute, private formBuilder:FormBuilder,private serverSide:ServerSideService, private navigator:Router,
    private authService:AuthServiceService, public ExamService:ExamService) 
  { 
    this.ExamService.timer$.subscribe((value)=>{
      if(value  === 1)
      {
        this.onSubmit();
      }

    });
      if(this.authService.authResponce.role !== 'Student')
      {
        this.navigator.navigate(['/login']);
        return;
      }
      this.getAllQuestions();
  }

   onSubmit()
  {
     this.getOrGnerateStudentAttempts();
  }
  
  getAllQuestions()
  {
    this.serverSide.getQuestionsByExamId(this.route.snapshot.params['id']).subscribe((data)=>{
      let result:ResponseClass<Question[]> = data as ResponseClass<Question[]>;
      this.questions = result.data as Question[];
      if(result.status==true)
      {
        this.questions = result.data as Question[];
        this.questions.forEach(element => {
          this.outOf += element.weight;
        });
      }
    });
  }

  getOrGnerateStudentAttempts()
  {
    this.serverSide.getStudentAttempts(this.authService.studentId,this.route.snapshot.params['id']).subscribe((data)=>{
      this.studentAttempts = new StudentAttempts();
      let result:ResponseClass<StudentAttempts> = data as ResponseClass<StudentAttempts>;
      if(result.status==true)
      {
        this.attempt = new Attempt();
        this.studentAttempts = result.data as StudentAttempts;
        this.serverSide.addAttempt(this.studentAttempts.id).subscribe((data)=>{
          let result:ResponseClass<Attempt> = data as ResponseClass<Attempt>;
          console.log(this.attempt.id);
          console.log(result);
          if(result.status==true)
          {
            this.attempt = result.data as Attempt;
            this.getAllSelectedAnswers();
          }
        });
      }
    });
  }
  getAllSelectedAnswers()
  {
    this.getAnswer();
    this.setGrade();
  }

  setGrade()
  {
    this.Grade.totalGrade = this.totalGrade;
    this.Grade.attemptId = this.attempt.id;
    this.Grade.outOf = this.outOf;
    this.serverSide.addGrade(this.Grade).subscribe((data)=>{
      let result:ResponseClass<Grade> = data as ResponseClass<Grade>;
      if(result.status==true)
      {
        console.log("Grade added successfully");
        this.navigator.navigate([`/examDashboard/${this.authService.courseId}`])
      }
    });
  }

  getAnswer()
  {
    
    this.questions.forEach(question => {
      let isChecked = false;
      document.querySelectorAll(`input[type=radio][name="${question.id}"]`).forEach(radio => {
        if((<HTMLInputElement>radio).checked)
        {
          isChecked = true;
          this.answer = new Answer();
          this.answer.questionId = question.id;
          this.answer.attemptId = this.attempt.id;
          this.answer.answerOption = (<HTMLInputElement>radio).value;
          this.answer.isCorrect = question.correctAnswer === (<HTMLInputElement>radio).value;
          this.answer.grade = question.correctAnswer === (<HTMLInputElement>radio).value ?  question.weight : 0;
          this.totalGrade += this.answer.grade;
          this.serverSide.addAnswer(this.answer).subscribe((data)=>{
            let result:ResponseClass<Answer> = data as ResponseClass<Answer>;
            if(result.status==true)
            {
              console.log("Answer added successfully");
            }
          });
        }
      });
      if(!isChecked)
      {
        this.answer = new Answer();
        this.answer.questionId = question.id;
        this.answer.attemptId = this.attempt.id;
        this.answer.answerOption = "";
        this.answer.isCorrect = false;
        this.answer.grade = 0;
        this.serverSide.addAnswer(this.answer).subscribe((data)=>{
          let result:ResponseClass<Answer> = data as ResponseClass<Answer>;
          if(result.status==true)
          {
            console.log("Answer added successfully");
          }
        });
      }
    });
  }

}
