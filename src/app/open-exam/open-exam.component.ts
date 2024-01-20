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

@Component({
  selector: 'app-open-exam',
  standalone: true,
  imports: [FormsModule,
    ReactiveFormsModule,
    CommonModule],
  templateUrl: './open-exam.component.html',
  styleUrl: './open-exam.component.css',
  providers: [ServerSideService]
})
export class OpenExamComponent {
  questions:Array<Question> = new Array<Question>();
  examId:number = 0;
  user:User = new User();
  studentId:number = 0;
  answer:Answer = new Answer();
  totalGrade:number = 0;
  Grade:Grade = new Grade();
  student:Student = new Student();
  attempt:Attempt = new Attempt();
  studentAttempts:StudentAttempts = new StudentAttempts();
  constructor(public route: ActivatedRoute, private formBuilder:FormBuilder,private serverSide:ServerSideService, private navigator:Router) 
  { 
      const value = localStorage.getItem('user');
      this.user = value ? JSON.parse(value): User;

      const value2 = localStorage.getItem(this.user.UserEmail);
      this.student = value2 ? JSON.parse(value2) : null;

      this.studentId = this.student.id;
      console.log(this.studentId);

      if(this.user.UserRule === '')
      {
        this.navigator.navigate(['/login']);
      }
      else
      {
        if(this.user.UserRule === 'Teacher')
        {
          this.navigator.navigate(['/login']);
        }
        else if (this.user.UserRule === 'Student')
        {
          this.studentId = this.user.Id;
        }
      } 
    this.serverSide.getExamById(route.snapshot.params['id']).subscribe((data)=>{
      let result:ResponseClass<Exam> = data as ResponseClass<Exam>;
      if(result.status==true)
      {
        this.examId = result.data?.id as number;
        this.getAllQuestions();
      }
    });
  }

   onSubmit()
  {
     this.getOrGnerateStudentAttempts();
     //this.setGrade();
  }
  
  getAllQuestions()
  {
    this.serverSide.getQuestionsByExamId(this.examId).subscribe((data)=>{
      let result:ResponseClass<Question[]> = data as ResponseClass<Question[]>;
      this.questions = result.data as Question[];
      if(result.status==true)
      {
        this.questions = result.data as Question[];
      }
    });
  }

  getOrGnerateStudentAttempts()
  {
    this.serverSide.getStudentAttempts(this.student.id,this.examId).subscribe((data)=>{
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
    document.querySelectorAll('input[type=radio]:checked').forEach((element) => {
      this.answer = new Answer();
      this.answer.questionId = Number((<HTMLInputElement>element).name);
      this.answer.attemptId = this.attempt.id;
      this.answer.answerOption = (<HTMLInputElement>element).value;
      this.answer.isCorrect = this.questions.filter(x=>x.id=== Number((<HTMLInputElement>element).name))[0].correctAnswer === (<HTMLInputElement>element).value;
      this.answer.grade = this.questions.filter(x=>x.id=== Number((<HTMLInputElement>element).name))[0].correctAnswer === (<HTMLInputElement>element).value ?  this.questions.filter(x=>x.id=== Number((<HTMLInputElement>element).name))[0].weight : 0;
      this.totalGrade += this.answer.grade;
      console.log(this.answer);

      this.serverSide.addAnswer(this.answer).subscribe((data)=>{
        let result:ResponseClass<Answer> = data as ResponseClass<Answer>;
        console.log(result);
        if(result.status==true)
        {
          console.log("Answer added successfully");
          //this.navigator.navigate(['/login']);
        }
      });
    });
    this.setGrade();
  }

  setGrade()
  {
    this.Grade.totalGrade = this.totalGrade;
    this.Grade.attemptId = this.attempt.id;
    this.serverSide.addGrade(this.Grade).subscribe((data)=>{
      let result:ResponseClass<Grade> = data as ResponseClass<Grade>;
      if(result.status==true)
      {
        console.log("Grade added successfully");
        
      }
    });
  }
}
