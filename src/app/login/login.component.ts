import { Component } from '@angular/core';
import {routes} from '../app.routes';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {FloatLabelType, MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { StudentInfo } from '../models/student-info/student-info.module';
import { TeacherInfo } from '../models/teacher-info/teacher-info.module';
import { ServerSideService } from '../server-side.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ResponseClass } from '../models/response-class/response-class.module';
import { User } from '../models/user/user.module';
import { Student, Teacher } from '../BackEndModels/models/models.module';


@Component({
  selector: 'app-login',
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
    CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [ServerSideService]
})
export class LoginComponent {
  formGroup: FormGroup;
  student:StudentInfo=new StudentInfo();
  teacher:TeacherInfo=new TeacherInfo();
  user:User= new User();


  constructor(private _formBuilder: FormBuilder,private serverSideService:ServerSideService
    ,private navigator:Router,private toastr: ToastrService) {
    this.formGroup = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email,Validators.pattern('^[a-zA-Z0-9_.]+@[a-zA-Z0-9-]+[\.][a-zA-Z]{2,}$')]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,}$')]],
      isStudent: ['', [Validators.required]],
    });
  }

  onSubmit()
  {
    console.log(this.isStudent.value);
    if(this.isStudent.value==="Teacher")
    {
      this.TeacherLogin();
    }
    else if(this.isStudent.value==="Student")
    {
      this.StudentLogin();
    }
  }

  get email() {
    return this.formGroup.get('email') as FormControl;
  }

  get password() {
    return this.formGroup.get('password') as FormControl;
  }

  get isStudent() {
    return this.formGroup.get('isStudent') as FormControl;
  }

  getErrorMessage(control: FormControl) {
    if (control.hasError('required')) {
      return 'You must enter a value';
    }
    if(control===this.email)
    {
      if (this.email.hasError('pattern')) {
        return 'Not a valid email';
      }
    }
    
    if(control===this.password)
    {
      if (this.password.hasError('required')) {
        return 'You must enter a value';
      }
      if (this.password.hasError('pattern')) {
        return 'Not a valid password';
      }
    }
    
    return '';
  }

  TeacherLogin()
  {
    this.serverSideService.teacherLogin(this.email.value, this.password.value).subscribe((data)=>
    {
      let result:ResponseClass<TeacherInfo> = new ResponseClass<TeacherInfo>();
      result=data as ResponseClass<TeacherInfo>;

      let result2:ResponseClass<Teacher> = new ResponseClass<Teacher>();
      result2=data as ResponseClass<Teacher>;

      //console.log(result2);

      if(result.status==true)
      {
        this.toastr.success('Login Successfully', 'Success').onHidden.subscribe(() => {
        this.navigator.navigate(['/courseDashboard']);});
        this.user.Id = 0;
        this.user.UserEmail = result.data?.email ?? '';
        this.user.UserPassword = result.data?.password ?? '';
        this.user.UserRule = 'Teacher';
        this.user.Status = true;
        this.serverSideService.addUser(this.user).subscribe((data)=>
        {
            let result:ResponseClass<User> = new ResponseClass<User>();
            result=data as ResponseClass<User>;
            this.user ? result.data:null;
            localStorage.setItem('user', JSON.stringify(this.user));
            localStorage.setItem(this.user.UserEmail, JSON.stringify(result2.data));
            });
        
        //console.log("I am in login page ")
        //console.log(this.user);
        //console.log(this.user);
      }
      else
      {
        this.toastr.error('Login Failed', 'Error');
      }
    });

  }

  StudentLogin()
  {
    this.serverSideService.studentLogin(this.email.value, this.password.value).subscribe((data)=>
    {
      let result:ResponseClass<Student> = new ResponseClass<Student>();
      result=data as ResponseClass<Student>;

      let result2:ResponseClass<Student> = new ResponseClass<Student>();
      result2=data as ResponseClass<Student>;
      if(result.status==true)
      {
        this.toastr.success('Login Successfully', 'Success').onHidden.subscribe(() => {
        this.navigator.navigate(['/courseDashboard']);});
        this.user.Id = 0;
        this.user.UserEmail = result.data?.email ?? '';
        this.user.UserPassword = result.data?.password ?? '';
        this.user.UserRule = 'Student';
        this.user.Status = true;
        this.serverSideService.addUser(this.user).subscribe((data)=>
        {
            let result:ResponseClass<User> = new ResponseClass<User>();
            result=data as ResponseClass<User>;
            this.user ? result.data:null;
            //console.log(this.user);
            localStorage.setItem('user', JSON.stringify(this.user));
            localStorage.setItem(this.user.UserEmail, JSON.stringify(result2.data));
            });
      }
      else
      {
        this.toastr.error('Login Failed', 'Error');
      }
    });
  }
  
}
