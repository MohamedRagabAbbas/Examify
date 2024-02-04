import {Component} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { AuthServiceService } from '../Services/auth-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private router: Router, public authService:AuthServiceService, 
    private authServiceService:AuthServiceService
   ) { }

  login() {
    this.router.navigate(['/login']);
  }
  main() {
    this.router.navigate(['/text']);
  }
  signUp() {
    this.router.navigate(['/signUp']);
  }
  test()
  {
    this.router.navigate(['/GenerateExam']);
  }
  courseDashboard()
  {
    console.log(this.authServiceService.authResponce.role);
    if(this.authServiceService.authResponce.role === '')
    {
      this.router.navigate(['/login']);
      return;
    }
    this.router.navigate([`/courseDashboard`]);
  }
  logOut()
  {
    this.authService.logOut();
  }
}



