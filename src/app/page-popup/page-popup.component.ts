import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Page } from '../page-detail/page';

@Component({
  selector: 'app-page-popup',
  template: `<span> {{ page }} </span>`,
})
export class PagePopupComponent implements OnInit {

  @Input() page: string;

  @Output()
  closed = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
