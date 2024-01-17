import { Component, Input } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Exam, Question } from '../BackEndModels/models/models.module';
import { ServerSideService } from '../server-side.service';
import { CommonModule } from '@angular/common';
import { ResponseClass } from '../models/response-class/response-class.module';

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
    startDate = new Date(2021, 1, 1, 0, 0, 0);
    endDate = new Date(2021, 1, 1, 0, 0, 0);
    gotStartDate = false;
    gotEndDate = false;
    question : Question = new Question();
    sendQuestion : Question = new Question();
    questions:Array<Question> = new Array<Question>();
    examId:number = 0;
    canAddQuestion = false;
    addnewQuestion = false;
    constructor(public route: ActivatedRoute, private formBuilder:FormBuilder,private serverSide:ServerSideService) 
    { 
      this.formGroup = this.formBuilder.group({
        examName: ['',Validators.required],
        examDescription: ['',Validators.required],
        //examStartTime: [this.startDate,Validators.required],
        //examEndTime: [this.endDate,Validators.required],
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
      document.getElementsByName('options').forEach((element) => {
        if ((element as HTMLInputElement).checked) {
          this.formGroup2.get('questionCorrectAnswer')?.setValue((element as HTMLInputElement).value);
        }
      });

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
      this.exam.startTime = this.startDate;
      this.exam.endTime = this.endDate;
      this.exam.courseId = this.route.snapshot.params['id'];
      this.serverSide.addExam(this.exam).subscribe((data)=>{
        let result:ResponseClass<Exam> = data as ResponseClass<Exam>;
        this.examId = result.data?.id as number;
        this.canAddQuestion = true;
        if(result.status==true)
        {
          this.canAddQuestion = true;
          this.addnewQuestion = true;
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
}
