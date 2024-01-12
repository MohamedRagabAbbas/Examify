import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {FloatLabelType, MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { CourseInfo } from '../models/course-info/course-info.module';
import { ServerSideService } from '../server-side.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrService } from 'ngx-toastr';
import { ResponseClass } from '../models/response-class/response-class.module';
import { Teacher } from '../BackEndModels/models/models.module';
import { User } from '../models/user/user.module';



@Component({
  selector: 'app-add-course',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    CommonModule,
  ],
  templateUrl: './add-course.component.html',
  styleUrl: './add-course.component.css',
  providers: [ServerSideService]
})
export class AddCourseComponent {
  formGroup: FormGroup;
  course:CourseInfo = new CourseInfo();
  teacher:Teacher= new Teacher();
  user:User=new User();

  constructor(private _formBuilder: FormBuilder, private serverSideService: ServerSideService, private router: Router, private toastr: ToastrService) {
    this.formGroup = this._formBuilder.group({
      code: ['', [Validators.required,Validators.minLength(4)]],
      subject: ['', [Validators.required, Validators.minLength(3)]],
      grade: ['', [Validators.required]],
    });
    const value1 = localStorage.getItem('user');
    this.user = value1 ? JSON.parse(value1) : null;

    const value2 = localStorage.getItem(this.user.UserEmail);
    this.teacher = value2 ? JSON.parse(value2) : null;
  }

  onSubmit()
  {
    this.course.Code = this.code.value;
    this.course.Subject = this.subject.value;
    this.course.Grade = this.grade.value;
    //console.log(this.course);
    //console.log(this.teacher);
    this.serverSideService.addCourse(this.course,this.teacher.id).subscribe((data)=>
    {
      //console.log(data);
      let result:ResponseClass<CourseInfo> = new ResponseClass<CourseInfo>();
      result = data as ResponseClass<CourseInfo>;
      if(result.status===true)
      {
        this.toastr.success('Course Added Successfully', 'Success').onHidden.subscribe(() => 
        { this.router.navigate(['/courseDashboard']);});
      }
      else
      {
        this.toastr.error('Course Not Added', 'Error').onHidden.subscribe(() => 
        { this.router.navigate(['/courseDashboard']);});
      }
    });
  }
  get code() {
    return this.formGroup.get('code') as FormControl;
  }

  get subject() {
    return this.formGroup.get('subject') as FormControl;
  }

  get grade() {
    return this.formGroup.get('grade') as FormControl;
  }

  getErrorMessage(control: FormControl) {
    if (control.hasError('required')) {
      return 'You must enter a value';
    }
    if(control===this.code)
    {
      if (this.code.hasError('pattern')) {
        return 'Not a valid email';
      }
    }
    if(control===this.subject)
    {
      if (this.subject.hasError('minlength')) {
        return 'Not a valid subject';
      }
    }
    return '';  
  }

}
