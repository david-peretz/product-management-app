import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimerService } from '../../services/timer.services';
import { RandomColorDirective } from '../../directives/random-color.directive';

@Component({
  selector: 'app-stopwatch',
  template: `
    <div >
      <h1 appRandomColor>{{ timerValue }}</h1>
      <button (click)="start()">התחלה</button>
      <button (click)="stop()">עצירה</button>
      <button (click)="reset()">איפוס</button>
    </div>
  `,
  styleUrls: ['stopwatch.component.css'],
  standalone: true,
  imports: [CommonModule,RandomColorDirective]
})
export class StopwatchComponent {
  timerValue = 0;

  constructor(private timerService: TimerService) {
    this.timerService.getTimer().subscribe(value => {
      this.timerValue = value;
    });
  }

  start() {
    this.timerService.start();
  }

  stop() {
    this.timerService.stop();
  }

  reset() {
    this.timerService.reset();
  }
}
