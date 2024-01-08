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
    CommonModule],
  templateUrl: './add-course.component.html',
  styleUrl: './add-course.component.css'
})
export class AddCourseComponent {
  formGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder) {
    this.formGroup = this._formBuilder.group({
      code: ['', [Validators.required,Validators.minLength(4)]],
      subject: ['', [Validators.required, Validators.minLength(8)]],
      grade: ['', [Validators.required]],
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
