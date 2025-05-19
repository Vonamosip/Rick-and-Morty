import { Directive, ElementRef, HostListener, output } from '@angular/core';

@Directive({
  selector: '[appScrollEnd]'
})
export class ScrollDirective {
  public isScroll = output<void>()

  constructor(private el: ElementRef) {}

  @HostListener('scroll', ['$event'])
  onScroll(event: Event): void {
    const target = this.el.nativeElement;
    if (target.scrollHeight - target.scrollTop <= target.clientHeight + 100) {
      this.isScroll.emit();
    }
  }
}