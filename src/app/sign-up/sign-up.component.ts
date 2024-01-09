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
    MatIconModule,CommonModule,HttpClientModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
  providers: [ServerSideService]
})


export class SignUpComponent {
  formGroup: FormGroup;
  hide = true;

  constructor(private _formBuilder: FormBuilder, private serverSideService:ServerSideService) {
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

    this.formGroup.get('confirmPassword')?.valueChanges.subscribe(value => {
      console.log(this.confirmPassword.invalid && this.confirmPassword.dirty && this.confirmPassword.value !== this.password.value);
    });
  }
  onSubmit() {
    this.serverSideService.getTeachers();
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

    if(this.email.hasError('pattern'))
    {
      return `You must enter a valid email address`;
    }
    if (control.hasError('required')) {
      return 'You must enter a value';
    }

    if (control.hasError('email')) {
      return `You must enter a valid email address`;
    }

    if(control.hasError('pattern'))
    {
      return `You must enter a valid password, consists of atleast one special character, /n one number, one smallCase character and one uppderCase character`;
    }

    if (control.hasError('minlength')) {
      if(control===this.password)
        return `You must enter atleast 8 characters`;
      return `You must enter atleast 3 characters`;
    }

    return 'Error, Please Enter Valid Input';
  }
}