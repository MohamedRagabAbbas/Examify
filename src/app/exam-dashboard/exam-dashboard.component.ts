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

@Component({
  selector: 'app-exam-dashboard',
  standalone: true,
  imports: [
      CommonModule,
        FormsModule, 
        ReactiveFormsModule, ],
  templateUrl: './exam-dashboard.component.html',
  styleUrl: './exam-dashboard.component.css',
  providers: [ServerSideService]
})
export class ExamDashboardComponent {
    exams:Array<Exam> = [];
    formGroup:FormGroup = new FormGroup({});
    user:User = new User();
    isStudent = true;
    constructor(public route: ActivatedRoute,private serverSideService:ServerSideService, private navigator:Router, private toastr: ToastrService) 
    { 
      const value = localStorage.getItem('user');
      this.user = value ? JSON.parse(value): User;
      this.allExams(route.snapshot.params['id']);
      if(this.user.UserRule === '')
      {
        this.navigator.navigate(['/login']);
      }
      else
      {
        if(this.user.UserRule === 'Teacher')
        {
          this.isStudent = false;
        }
        else if (this.user.UserRule === 'Student')
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
          console.log(this.exams);
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
      /*this.serverSideService.updateExam(id).subscribe((data)=>{
        let result = new ResponseClass<Exam>();
        result = data as ResponseClass<Exam>;
        if(result.status === true)
        {
          // use toaster here to show success message
        }
        else
        {
          // use toaster here to show error message
        }
      });*/
    }

    deleteExam(id:number)
    {
      this.serverSideService.deleteExam(id).subscribe((data)=>{
        let result = new ResponseClass<Exam>();
        result = data as ResponseClass<Exam>;
        if(result.status === true)
        {
          
          this.toastr.success('Exam Deleted Successfully', 'Success');
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

}
