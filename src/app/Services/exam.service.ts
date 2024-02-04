import { Time } from '@angular/common';
import { Injectable } from '@angular/core';
import { Behavior } from 'popper.js';
import { BehaviorSubject, interval } from 'rxjs';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  private timerSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public timer$ = this.timerSubject.asObservable();
  constructor() {
    
   }

   startTimer(duration: number) {
    interval(1000)
      .pipe(
        take(duration),
        map((value) => duration - value)
      )
      .subscribe((remainingTime) => {
        this.timerSubject.next(remainingTime);
      });
  }

  convertIntoTime(remainingTime: number): string {
    const hourse = Math.floor(remainingTime / 60);
    const minutes = Math.floor(hourse / 60);
    const seconds = remainingTime % 60;
    return `${hourse}:${minutes}:${seconds}`;
  }
  convertIntoNumber(time: number): void {
    const numberofSeconds = time * 60;
    this.startTimer(numberofSeconds);
  }
}
