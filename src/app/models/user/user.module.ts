import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class User {
  Id:number = 0;
  UserEmail:string = "";
  UserPassword:string = "";
  UserRule:string = "";
  Status:boolean = false;
 }
