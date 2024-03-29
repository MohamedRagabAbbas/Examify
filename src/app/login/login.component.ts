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
import { AuthLogIn, AuthenticationResponse, Student, Teacher } from '../BackEndModels/models/models.module';
import {AuthServiceService} from '../Services/auth-service.service'
import { LoadingService } from '../Services/loading.service';


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
  authLogIn:AuthLogIn = new AuthLogIn();
  authenticationResponse:AuthenticationResponse = new AuthenticationResponse();
  user:User= new User();
  showPassword = false;
  iconClass:string = 'bi-eye-slash';


  constructor(private _formBuilder: FormBuilder,private serverSideService:ServerSideService
    ,private navigator:Router,private toastr: ToastrService, private authService:AuthServiceService,
    public LoadingService:LoadingService) {
    this.formGroup = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email,Validators.pattern('^[a-zA-Z0-9_.]+@[a-zA-Z0-9-]+[\.][a-zA-Z]{2,}$')]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,}$')]],
    });
  }

  onSubmit()
  {
    this.LogIn();
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
      return 'Cannot be empty';
    }
    if(control===this.email)
    {
      return 'Not a valid email!';
    } 
    
    if(control===this.password)
    {
      return 'Not a valid password!';
    }
    
    return '';
  }

  LogIn()
  {
    this.authLogIn.email = this.email.value as string;
    this.authLogIn.password = this.password.value as string;

    this.authService.logIn(this.authLogIn).then(()=>
    {

      if(this.authService.authResponce.isAuthenticated)
      {
        this.toastr.success("Successful Login..",'success');
        this.navigator.navigate(['/courseDashboard'])
      }
      else
      {
        this.toastr.error(this.authService.authResponce.message,'error');
      }
    });
    
  }
    /*this.serverSideService.teacherLogin(this.email.value, this.password.value).subscribe((data)=>
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
       // this.user.UserEmail = result.data?.email ?? '';
       // this.user.UserPassword = result.data?.password ?? '';
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
    this.email.setValue(this.email.value.removeWhitespace());
    this.password.setValue(this.password.value.removeWhitespace());
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
        //this.user.UserEmail = result.data?.email ?? '';
        //this.user.UserPassword = result.data?.password ?? '';
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
  */
  GoToRegister()
  {
    this.navigator.navigate(['/signUp']);
  }

  showHidePassword() {
    console.log("I am in show hide password");
    this.showPassword = !this.showPassword;
    this.iconClass = this.showPassword ? 'bi-eye-slash-fill' : 'bi-eye-slash';
  }
  
}
