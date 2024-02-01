import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';  
import { ReactiveFormsModule } from '@angular/forms';  
import { HttpClientModule,HTTP_INTERCEPTORS  } from '@angular/common/http';
import { AuthServiceService } from './Services/auth-service.service';
import { LoadingService } from './Services/loading.service';
import { LoadingInterceptorService } from './Services/loading-interceptor.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule
    , RouterOutlet
    ,NavbarComponent
    ,ReactiveFormsModule
    ,HttpClientModule
    ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AuthServiceService,
  ],

})
export class AppComponent {
  constructor( public LoadingService:LoadingService) {

   }
  [x: string]: any;
  title = 'Examify';
}
