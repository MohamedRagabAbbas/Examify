import { Component, Input } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Exam, Question } from '../BackEndModels/models/models.module';
import { ServerSideService } from '../server-side.service';
import { CommonModule } from '@angular/common';
import { ResponseClass } from '../models/response-class/response-class.module';
import { ExamInfo } from '../models/exam-info/exam-info.module';
import { Toast, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-exam',
  standalone: true,
  imports: [FormsModule,
    ReactiveFormsModule,
    CommonModule],
  templateUrl: './exam.component.html',
  styleUrl: './exam.component.css',
  providers: [ServerSideService]
})
export class ExamComponent {
  formGroup:FormGroup = new FormGroup({});
  formGroup2:FormGroup = new FormGroup({});
  exam:Exam = new Exam();
  updatedExam:ExamInfo = new ExamInfo();
  startDate = new Date(2021, 1, 1, 0, 0, 0);
  endDate = new Date(2021, 1, 1, 0, 0, 0);
  displayedStartTime = new Date(2021, 1, 1, 0, 0, 0);
  displayedEndTime = new Date(2021, 1, 1, 0, 0, 0);
  gotStartDate = false;
  gotEndDate = false;
  question : Question = new Question();
  sendQuestion : Question = new Question();
  updatedQuestion : Question = new Question();
  sendUpdatedQuestion : Question = new Question();
  questions:Array<Question> = new Array<Question>();
  examId:number = 0;
  canAddQuestion = false;
  addnewQuestion = false;
  isUpdate = false;
  constructor(public route: ActivatedRoute, private formBuilder:FormBuilder,private serverSide:ServerSideService,
    private toastr:ToastrService) 
  { 

    this.formGroup = this.formBuilder.group({
      examName: ['',Validators.required],
      examDescription: ['',Validators.required],
      examStartTime: [Date.now,Validators.required],
      examEndTime: [Date.now,Validators.required],
      examAttemptsNumber: ['',Validators.required],
      examDuration: ['',Validators.required],
    });
    
    this.formGroup2 = this.formBuilder.group({
      questionNumber: ['',Validators.required],
      questionText:   ['',Validators.required],
      questionOption1: ['',Validators.required],
      questionOption2: ['',Validators.required],
      questionOption3: ['',Validators.required],
      questionOption4: ['',Validators.required],
      questionWeight: ['',Validators.required],
      questionCorrectAnswer: ['',Validators.required],
    });
  }

  onSubmit()
  {
    
  }

  startDateChanged(event:any){
    const selectedValue = event.target.value;
    this.startDate = new Date(selectedValue);
    this.gotStartDate = true;
  }

  endDateChanged(event:any){
    const selectedValue = event.target.value;
    this.endDate = new Date(selectedValue);
    this.gotEndDate = true;
  }

  addQuestion() {
    this.addnewQuestion = true;
    this.canAddQuestion = false;
  }

  submitQuestion() {

    if(this.isUpdate)
    {
      this.sendUpdatedQuestion.examId = this.examId;
      this.sendUpdatedQuestion.questionNumber = this.formGroup2.get('questionNumber')?.value;
      this.sendUpdatedQuestion.weight = this.formGroup2.get('questionWeight')?.value;
      this.sendUpdatedQuestion.questionText = this.formGroup2.get('questionText')?.value;
      this.sendUpdatedQuestion.option1 = this.formGroup2.get('questionOption1')?.value;
      this.sendUpdatedQuestion.option2 = this.formGroup2.get('questionOption2')?.value;
      this.sendUpdatedQuestion.option3 = this.formGroup2.get('questionOption3')?.value;
      this.sendUpdatedQuestion.option4 = this.formGroup2.get('questionOption4')?.value;
      this.sendUpdatedQuestion.correctAnswer = this.formGroup2.get('questionCorrectAnswer')?.value;
      this.serverSide.updateQuestion(this.updatedQuestion.id,this.sendUpdatedQuestion).subscribe((data)=>{
        let result:ResponseClass<Question> = data as ResponseClass<Question>;
        this.question = result.data as Question;
        if(result.status==true)
        {
          this.canAddQuestion = true;
          this.addnewQuestion = false;
          this.formGroup2.reset();
          this.getAllQuestions();
          this.isUpdate = false;
        }
      });
      return;
    }

    this.sendQuestion.examId = this.examId;
    this.sendQuestion.questionNumber = this.formGroup2.get('questionNumber')?.value;
    this.sendQuestion.weight = this.formGroup2.get('questionWeight')?.value;
    this.sendQuestion.questionText = this.formGroup2.get('questionText')?.value;
    this.sendQuestion.option1 = this.formGroup2.get('questionOption1')?.value;
    this.sendQuestion.option2 = this.formGroup2.get('questionOption2')?.value;
    this.sendQuestion.option3 = this.formGroup2.get('questionOption3')?.value;
    this.sendQuestion.option4 = this.formGroup2.get('questionOption4')?.value;
    this.sendQuestion.correctAnswer = this.formGroup2.get('questionCorrectAnswer')?.value;

    this.serverSide.addQuestion(this.sendQuestion).subscribe((data)=>{
      let result:ResponseClass<Question> = data as ResponseClass<Question>;
      this.question = result.data as Question;
      if(result.status==true)
      {
        this.canAddQuestion = true;
        this.addnewQuestion = false;
        this.formGroup2.reset();
        this.getAllQuestions();
      }
    });
  }
  submitExamInfo()
  {
    
    this.exam.name = this.formGroup.get('examName')?.value;
    this.exam.description = this.formGroup.get('examDescription')?.value;
    this.exam.attemptsNumber = this.formGroup.get('examAttemptsNumber')?.value;
    this.exam.courseId = this.route.snapshot.params['id'];
    this.exam.createdOn = new Date(Date.now());
    this.exam.startTime = this.formGroup.get('examStartTime')?.value as Date;
    this.exam.endTime = this.formGroup.get('examEndTime')?.value as Date;
    this.exam.duration = this.formGroup.get('examDuration')?.value;

    this.serverSide.addExam(this.exam).subscribe((data)=>{
      let result:ResponseClass<Exam> = data as ResponseClass<Exam>;
      if(result.status==true)
      {
        //console.log(result);
        this.canAddQuestion = true;
        this.addnewQuestion = false;
        this.examId = result.data?.id as number;
        this.toastr.success('Exam Added Successfully', 'Success');
        console.log(this.exam);
      }
    });
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
  getExamById(id:number)
  {
    this.serverSide.getExamById(id).subscribe((data)=>{
      let result:ResponseClass<Exam> = data as ResponseClass<Exam>;
      if(result.status==true)
      {
        this.exam = result.data as Exam;
        this.examId = this.exam.id;
        this.getAllQuestions();
      }
    });
  }
  updateQuestion(id:number)
  {
    this.isUpdate = true;
    this.serverSide.getQuestionById(id).subscribe((data)=>{
      let result:ResponseClass<Question> = data as ResponseClass<Question>;
      if(result.status==true)
      {
        this.updatedQuestion = result.data as Question;
        this.formGroup2.setValue({
          questionNumber: this.updatedQuestion.questionNumber,
          questionText: this.updatedQuestion.questionText,
          questionOption1: this.updatedQuestion.option1,
          questionOption2: this.updatedQuestion.option2,
          questionOption3: this.updatedQuestion.option3,
          questionOption4: this.updatedQuestion.option4,
          questionWeight: this.updatedQuestion.weight,
          questionCorrectAnswer: this.updatedQuestion.correctAnswer,
        });
        this.formGroup2.updateValueAndValidity();
      }
    });
    // scroll to the end of the page
    window.scrollTo(0,document.body.scrollHeight);
  }
  deleteQuestion(id:number)
  {
    this.serverSide.deleteQuestion(id).subscribe((data)=>{
      let result:ResponseClass<Question> = data as ResponseClass<Question>;
      if(result.status==true)
      {
        this.getAllQuestions();
        
      }
    });
  }
  deleteThis()
  {
    if(this.isUpdate)
    {
      this.serverSide.deleteQuestion(this.updatedQuestion.id).subscribe((data)=>{
        let result:ResponseClass<Question> = data as ResponseClass<Question>;
        if(result.status==true)
        {
          this.getAllQuestions();
          this.isUpdate = false;
          this.formGroup2.reset();
        }
      });
    }
    else
    {
      this.addnewQuestion = false;
      this.canAddQuestion = true;
    }
  }
}
