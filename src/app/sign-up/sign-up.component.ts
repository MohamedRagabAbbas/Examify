import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {routes} from '../app.routes';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {FloatLabelType, MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ServerSideService } from '../server-side.service';
import { HttpClientModule } from '@angular/common/http';
import { StudentInfo } from '../models/student-info/student-info.module';
import { TeacherInfo } from '../models/teacher-info/teacher-info.module';
import { ResponseClass } from '../models/response-class/response-class.module';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthSignUp, AuthenticationResponse } from '../BackEndModels/models/models.module';
import {AuthServiceService} from '../Services/auth-service.service'


@Component({
  selector: 'app-sign-up',
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
    HttpClientModule,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
  providers: [ServerSideService,ToastrService,]
})


export class SignUpComponent {
  formGroup: FormGroup;
  stdeunt: StudentInfo = new StudentInfo();
  teacher: TeacherInfo = new TeacherInfo();
  authSignUp:AuthSignUp = new AuthSignUp ();
  authenticationResponse:AuthenticationResponse = new AuthenticationResponse();
  hide = true;
  notSelected = false;
  showPassword = false;
  iconClass:string = 'bi-eye-slash';

  constructor(private _formBuilder: FormBuilder, private serverSideService:ServerSideService,private navigator:Router
    ,private toastr: ToastrService, private authService:AuthServiceService) {
      
    this.formGroup = this._formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email,Validators.pattern('^[a-zA-Z0-9_.]+@[a-zA-Z0-9-]+[\.][a-zA-Z]{2,}$')]],
      grade: ['', [Validators.required, Validators.minLength(1)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,}$')]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
      isStudent: ['', [Validators.required]],
    });

    this.formGroup.get('isStudent')?.valueChanges.subscribe(value => {
      this.hide = value === 'Teacher';
      if (this.hide) {
        this.formGroup.get('grade')?.reset();
      }
      if(this.isStudent.value==='Teacher')
      {
        this.formGroup.get('grade')?.clearValidators();
        this.formGroup.get('grade')?.updateValueAndValidity();
      }
      else
      {
        this.formGroup.get('grade')?.setValidators([Validators.required, Validators.minLength(1)]);
        this.formGroup.get('grade')?.updateValueAndValidity();
      }
    });
  }



  onSubmit() {
    if(this.formGroup.get('isStudent')?.hasError('required'))
    {
      this.notSelected = true;
      this.toastr.error("Please Select User Type","Error");
      return;
    }
    this.SignUp();
    /*
    if(this.isStudent.value==='Teacher')
    {
      this.addTeacher();
      console.log('I am here');
    }
    else if(this.isStudent.value==='Student')
    {
      this.AddStudent();
    }*/
  }

  get name() {
    return this.formGroup.get('name') as FormControl;
  }

  get email() {
    return this.formGroup.get('email') as FormControl;
  }

  get grade() {
    return this.formGroup.get('grade') as FormControl;
  }

  get password() {
    return this.formGroup.get('password') as FormControl;
  }

  get confirmPassword() {
    return this.formGroup.get('confirmPassword') as FormControl;
  }

  get isStudent() {
    return this.formGroup.get('isStudent') as FormControl;
  }

  getErrorMessage(control: FormControl) {

    if(control.hasError('required'))
    {
      return 'Cannot be empty';
    }
    if(control.hasError('minlength'))
    {
      if(control===this.name)
      {
        return `You must enter atleast 3 characters`;
      }
      else if(control===this.password)
      {
        return `You must enter atleast 8 characters`;
      }
    }
    if(control===this.email)
    {
      return 'Not a valid email!';
    }
    if(control===this.grade)
    {
      return 'Not a valid grade!';
    }
    if(control===this.password)
    {
      return 'Not a valid password!, it must consist of atleast one special character, one number, one smallCase character and one uppderCase character';
    }
    return 'Error, Please Enter Valid Input';
  }

   async SignUp()
  {
    this.authSignUp.name = this.name.value as string;
    this.authSignUp.email = this.email.value as string;
    this.authSignUp.password = this.password.value as string;
    this.authSignUp.role = this.isStudent.value as string;
    this.authSignUp.role === "Student"? this.authSignUp.grade = this.grade.value as string : this.authSignUp.grade = "Not Student";


    this.authService.signUp(this.authSignUp).then(()=>
    {
        console.log(this.authService.authResponce);
        if(this.authService.authResponce.isAuthenticated)
          {
            this.toastr.success("Successful SignUp..",'success');
            this.navigator.navigate(['/courseDashboard'])
          }
          else
          {
            this.toastr.error(this.authService.authResponce.message,'error');
          }
    });
  }

    /*this.serverSideService.addTeacher(this.teacher).subscribe(
      (data)=>
      {
        let result: ResponseClass<TeacherInfo> = new ResponseClass<TeacherInfo>;
        result = data as ResponseClass<TeacherInfo>;
        if(result.status==true)
        {
          this.toastr.success("Login Successfull","Success").onHidden.subscribe(() => {
          this.navigator.navigate(['/login'])});
        }
        else
        {
          //use toster here to show error message
          this.toastr.error("Login Failed","Error");
        }
        
     });;
  }

  AddStudent()
  {
    this.stdeunt.name=this.name.value;
    this.stdeunt.email=this.email.value;
    this.stdeunt.password=this.password.value;
    this.stdeunt.grade=this.grade.value;
    this.serverSideService.addStudent(this.stdeunt).subscribe(
      (data)=>
      {
        let result: ResponseClass<StudentInfo> = new ResponseClass<StudentInfo>;
        result = data as ResponseClass<StudentInfo>;
        if(result.status==true)
        {
          // navigate to login page after 2 sec 
          //use toster here to show success message
          this.toastr.success("Login Successful", "Success").onHidden.subscribe(() => {
            // This code will execute after the success toast is hidden
            this.navigator.navigate(['/login']);
          });

        }
        else
        {
          //use toster here to show error message
          this.toastr.error("Login Failed","Error");
        }
      }
    );
  }*/

  showHidePassword() {
    console.log("I am in show hide password");
    this.showPassword = !this.showPassword;
    this.iconClass = this.showPassword ? 'bi-eye-slash-fill' : 'bi-eye-slash';
  }


}