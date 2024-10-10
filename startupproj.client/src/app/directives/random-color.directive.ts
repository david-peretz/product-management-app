import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appRandomColor]',

  standalone:true
})
export class RandomColorDirective implements OnInit {
  private colors = ['red', 'green', 'blue', 'orange', 'purple', 'pink'];
  
  constructor(private el: ElementRef) {}

  ngOnInit() {
    

    setInterval(() => {
      const randomColor = this.colors[Math.floor(Math.random() * this.colors.length)];
      this.el.nativeElement.style.color = randomColor;
    }, 3000);
  }
}
