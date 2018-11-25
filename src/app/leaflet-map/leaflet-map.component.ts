import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';

import {
  tileLayer, latLng,
  Layer, LatLngBounds, LatLng, TileLayer, MapOptions, Map, LayersControlEvent,
} from 'leaflet';
import 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/images/marker-icon.png';
import 'leaflet/dist/images/marker-icon-2x.png';

import { Page } from '../page-detail/page';
import { PagePopupService } from '../_services/page-popup.service';
import { PageService } from '../_services/page.service';
import { LeafletDirective } from '@asymmetrik/ngx-leaflet';
import { MapService } from '../_services/map.service';

@Component({
  providers: [PagePopupService, LeafletDirective],
  selector: 'app-leaflet-map',
  templateUrl: './leaflet-map.component.html',
  styleUrls: ['./leaflet-map.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LeafletMapComponent implements OnInit {

  mapConfig: { minZoom: number, maxZoom: number, zoom: number };
  options: MapOptions;
  layersControl;
  fitBounds: LatLngBounds;
  layers: Layer[];

  pages$: Observable<Page[]>;
  selectedPage$: Observable<Page>;

  constructor(private mapService: MapService, private pageService: PageService) {
    this.options = {
      layers: [
        this.mapService.baseLayer
      ],
      zoom: this.mapService.mapConfig.zoom,
      center: this.mapService.center,
      zoomSnap: 1.5,
    };
    this.layersControl = {
      'baseLayers': {
        '高德地图': this.mapService.autonaviMaps(),
        '谷歌影像': this.mapService.googleSatelMaps(),
        '谷歌地图': this.mapService.googleMaps()
      }
    };
  }

  ngOnInit() {
    this.pages$ = this.pageService.showPages;
    this.pages$.subscribe(pages => this.changeFitBounds(pages));
    this.selectedPage$ = this.pageService.selectedPage;
  }

  changeFitBounds(pages: Page[]) {
    const latitudes: number[] = [];
    const longitudes: number[] = [];
    if (pages.length > 0) {
      pages.forEach(page => {
        latitudes.push(page.latitude);
        longitudes.push(page.longitude);
      });

      const latitudeMin = Math.min.apply(null, latitudes);
      const latitudeMax = Math.max.apply(null, latitudes);
      const longitudeMin = Math.min.apply(null, longitudes);
      const longitudeMax = Math.max.apply(null, longitudes);

      this.fitBounds = new LatLngBounds(
        [
          [latitudeMin, longitudeMin],
          [latitudeMax, longitudeMax]
        ]
      );
    } else {
      this.fitBounds = new LatLngBounds([
        [this.mapService.center.lat, this.mapService.center.lng],
        [this.mapService.center.lat, this.mapService.center.lng]
      ]);
    }
  }

  onMapReady(map: Map) {
    map.on('baselayerchange', (ev: LayersControlEvent) => {});
  }
}
