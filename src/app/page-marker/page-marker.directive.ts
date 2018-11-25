import { Directive, OnChanges, NgZone, SimpleChange, Input, OnDestroy } from '@angular/core';
import { LeafletDirective } from '@asymmetrik/ngx-leaflet';
import { Page } from '../page-detail/page';
import { Marker, marker, Layer, LeafletMouseEvent, PopupEvent } from 'leaflet';
import { PagePopupService } from '../_services/page-popup.service';
import { PageService } from '../_services/page.service';

@Directive({
  selector: '[pageMarker]'
})
export class PageMarkerDirective implements OnChanges, OnDestroy {

  @Input('pageMarker') page: Page;
  marker: Marker;

  constructor(
    private leafletDirective: LeafletDirective,
    private pagePopupService: PagePopupService,
    private pageService: PageService,
    private zone: NgZone
  ) { }

  ngOnDestroy() {
    this.marker.remove();
  }

  ngOnChanges(changes: { [key: string]: SimpleChange }) {
    if (changes['page']) {

      // Update the page
      const p: Page = changes['page'].previousValue;
      const n = changes['page'].currentValue;

      this.zone.runOutsideAngular(() => {
        if (null != p) {
          this.marker.remove();
        }
        if (null != n) {
          this.marker = marker([n.latitude, n.longitude]);
          this.marker.bindPopup(l => this.pagePopupService.buildPagePopup(n), {
            minWidth: 179,
            maxWidth: 179,
            closeButton: false
          });
          this.marker.off('click');
          this.addLayerEventListeners(this.marker);
          this.leafletDirective.getMap().addLayer(this.marker);
        }
      });

    }
  }

  private addLayerEventListeners(l: Layer) {

    l.on('mouseover', (ev: LeafletMouseEvent) => this.zone.run(() => this.marker.openPopup()));
    l.on('click', (ev) => this.zone.run(() => {
      this.marker.closePopup();
      this.pageService.bindSelectedPage(this.page);
    }));

  }

}
