import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { LoadingService } from './loading.service';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthenticationResponse } from '../BackEndModels/models/models.module';

@Injectable({
  providedIn: 'root'
})
export class LoadingInterceptorService implements HttpInterceptor {

  auth:AuthenticationResponse = new AuthenticationResponse();
  constructor(private loadingService:LoadingService,private router: Router) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loadingService.showLoading();
    this.auth = JSON.parse(localStorage.getItem("authResponce")?? '{}') as AuthenticationResponse ?? [];
    if(this.auth.isAuthenticated)
    {
      req = req.clone({setHeaders:{Authorization:`Bearer ${this.auth.token}`}})
    }
    return next.handle(req).pipe(
      finalize(() => {
        this.loadingService.hideLoading();
      })
    );
  }

}
