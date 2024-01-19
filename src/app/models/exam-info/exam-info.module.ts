import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class ExamInfo {
  name: string = '';
  description: string = '';
  attemptsNumber: number = 0;
  courseId: number = 0;
  createdOn: Date = new Date();
  updatedOn: Date = new Date();
  startTime: Date = new Date();
  endTime: Date = new Date();
}
