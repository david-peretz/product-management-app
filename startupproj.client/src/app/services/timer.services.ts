import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  private timerValue = 0;
  private timer$ = new BehaviorSubject<number>(this.timerValue);
  private timerSubscription?: Subscription;

  getTimer() {
    return this.timer$.asObservable();
  }

  start() {
    if (!this.timerSubscription) {
      this.timerSubscription = interval(1000).subscribe(() => {
        this.timerValue++;
        this.timer$.next(this.timerValue);
      });
    }
  }

  stop() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
      this.timerSubscription = undefined;
    }
  }

  reset() {
    this.stop();
    this.timerValue = 0;
    this.timer$.next(this.timerValue);
  }
}
