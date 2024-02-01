import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../Services/auth-service.service';
import { AuthenticationResponse } from '../BackEndModels/models/models.module';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent implements OnInit  {
  authenticationResponse:AuthenticationResponse = new AuthenticationResponse();
  constructor(private authService:AuthServiceService)
  {

  }

  ngOnInit():void{
    this.authenticationResponse = this.authService.authResponce;
  }
}
