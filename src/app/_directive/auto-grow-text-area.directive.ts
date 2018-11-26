import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[autoGrowTextArea]'
})
export class AutoGrowTextAreaDirective {

  constructor(private el: ElementRef) {
  }

  autoGrow() {
    const textArea = this.el.nativeElement;
    textArea.style.overflow = 'hidden';
    textArea.style.height = '0px';
    textArea.style.height = textArea.scrollHeight + 'px';
  }

  @Input('autoGrowTextArea')
  set value(v) {
    this.autoGrow();
  }

}
