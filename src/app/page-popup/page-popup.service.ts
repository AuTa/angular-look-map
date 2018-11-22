import { Injectable, ApplicationRef, Injector, ComponentFactoryResolver } from '@angular/core';
import { NgElement, WithProperties } from '@angular/elements';
import { Page } from '../page-detail/page';
import { PagePopupComponent } from './page-popup.component';

@Injectable()
export class PagePopupService {

  constructor(private injector: Injector,
    private applicationRef: ApplicationRef,
    private componentFactoryResolver: ComponentFactoryResolver) { }

  buildPagePopup(page: Page) {
    // Create element
    const pagePopup: NgElement & WithProperties<PagePopupComponent> = document.createElement('page-popup-element') as any;
 
    // Listen to the close event
    pagePopup.addEventListener('closed', () => document.body.removeChild(pagePopup));
 
    // Set
    pagePopup.uuid = page.uuid;
    pagePopup.title = page.title;
    pagePopup.image_url = page.information.content;
    pagePopup.image_alt = page.information.alt;
 
    // Add to the DOM
    document.body.appendChild(pagePopup);

    return pagePopup;
  }

}
