import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-page-popup',
  templateUrl: 'page-popup.component.html',
  styleUrls: ['page-popup.component.css']
})
export class PagePopupComponent implements OnInit {

  @Input() uuid: string;
  @Input() title: string;
  @Input() author: string;
  @Input() url: string;
  @Input() image_alt: string;
  @Input() image_url: string;

  @Output()
  closed = new EventEmitter();

  constructor() {
   }

  ngOnInit() {
  }

}
