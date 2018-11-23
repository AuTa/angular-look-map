import { Injectable } from '@angular/core';
import { Page } from '../page-detail/page';
import { marker, PopupEvent, Marker } from 'leaflet';
import { PageMarker } from './page-marker';
import { PagePopupService } from '../page-popup/page-popup.service';

@Injectable()
export class PageMarkerService {

  constructor(private pagePopupService: PagePopupService) {
  }

  getMarkers(pages: Page[]): Marker[] {
    return pages.map(page => {
      const pageMarker = this._createPageMarker(page);
      return pageMarker.marker;
    });
  }

  _createPageMarker(page: Page): PageMarker {
    return new PageMarker(page, marker([page.latitude, page.longitude]), this.pagePopupService);
  }
}
