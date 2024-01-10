import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ServerSideService } from '../server-side.service';
import { User } from '../models/user/user.module';


@Component({
  selector: 'app-courses-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './courses-dashboard.component.html',
  styleUrl: './courses-dashboard.component.css',
  providers: [ServerSideService]
})
export class CoursesDashboardComponent {
  isStudent = true;
  user:User = new User();
  constructor(private serverSideService: ServerSideService, private router: Router  ) 
  {
    const value = localStorage.getItem('user');
    this.user = value ? JSON.parse(value) : null;
    if(this.user === null)
    {
      this.router.navigate(['/login']);
    }
    else
    {
      if(this.user.UserRule === 'Teacher')
      {
        this.isStudent = false;
      }
      else
      {
        this.isStudent = true;
      }
    }
  }

  logout()
  {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  AddCourseTeacher()
  {
    this.router.navigate(['/addCourse']);
  }



 
  }

  
  

