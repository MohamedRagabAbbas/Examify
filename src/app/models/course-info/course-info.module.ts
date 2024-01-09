import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class CourseInfo {
  code: string = '';
  subject: string = '';
  grade: string = '';
}
