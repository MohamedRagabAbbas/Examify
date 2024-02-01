import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  public isLoading:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor() { }
  showLoading() {
    this.isLoading.next(true);
    console.log(this.isLoading.value);
  }
  hideLoading() {
    this.isLoading.next(false);
    console.log(this.isLoading.value);
  }
}
