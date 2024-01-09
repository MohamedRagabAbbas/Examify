import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ServerSideService {

  rootAPI:string = 'https://localhost:7095/api/Teacher/GetAllTeachers';
  constructor(private httpClient:HttpClient) 
  { 

  }
  getTeachers()
  {
     this.httpClient.get(this.rootAPI).subscribe((data)=>{
      console.log(data);
  });
}}
