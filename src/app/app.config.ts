import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';



export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimations(),HttpClientModule,provideToastr({
    timeOut: 2000,
    progressBar: true,
    progressAnimation: 'increasing',
    positionClass: 'toast-top-right',

  }),],
  };
