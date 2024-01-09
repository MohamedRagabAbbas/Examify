import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class StudentInfo {
  name: string = '';
  grade: string = '';
  email: string = '';
  password: string = '';
}
