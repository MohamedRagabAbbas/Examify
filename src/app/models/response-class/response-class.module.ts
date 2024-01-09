import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class ResponseClass<T> {
  message: string = '';
  status: boolean = false;
  data?: T;
}
