import { Page } from '../page-detail/page';
import { Marker, PopupEvent, LeafletMouseEvent } from 'leaflet';
import { PagePopupService } from '../page-popup/page-popup.service';

export class PageMarker {

    constructor(public page: Page, public marker: Marker, private pagePopupService: PagePopupService) {
        marker.bindPopup(l => this.pagePopupService.buildPagePopup(page), {
            minWidth: 180,
            maxWidth: 180,
            closeButton: false
          });
          marker.on({
            mouseover: (ev: LeafletMouseEvent) => { marker.openPopup(); },
            popupopen: (ev: PopupEvent) => {
                ev.popup.getElement().getElementsByClassName('leaflet-popup-content')[0].removeAttribute('style');
            },
            popupclose: (ev) => {
      
            }
          });
    }
}
