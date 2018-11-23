import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { createCustomElement, NgElement, WithProperties } from '@angular/elements';

import {
  tileLayer, latLng, marker, popup, control,
  Map, Layer, LatLngBounds, LatLng, Popup, TileLayer, MapOptions, Control,
  LeafletMouseEvent, LeafletEvent
} from 'leaflet';
import 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/images/marker-icon.png';

import { Page } from '../page-detail/page';
import { PagePopupComponent } from '../page-popup/page-popup.component';
import { PagePopupService } from '../page-popup/page-popup.service';
import { PageMarkerService } from '../page-marker/page-marker.service';

@Component({
  providers: [PagePopupService, PageMarkerService],
  selector: 'app-leaflet-map',
  templateUrl: './leaflet-map.component.html',
  styleUrls: ['./leaflet-map.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LeafletMapComponent implements OnInit {

  mapConfig: { minZoom: number, maxZoom: number, zoom: number };
  center: LatLng;
  options: MapOptions;
  layersControl;

  fitBounds: LatLngBounds;
  layers: Layer[];

  private autonaviMaps: TileLayer;
  private googleSatelMaps: TileLayer;
  private googleMaps: TileLayer;

  constructor(private pageMarkerService: PageMarkerService) {
    this.mapConfig = { minZoom: 3, maxZoom: 16, zoom: 4 };
    this.autonaviMaps = tileLayer('https://webrd02.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}', {
      minZoom: this.mapConfig.minZoom,
      maxZoom: this.mapConfig.maxZoom,
      detectRetina: true,
      attribution: '<a href="https://ditu.amap.com/">高德地图</a> &copy;'
    });
    this.googleSatelMaps = tileLayer('http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}', {
      minZoom: this.mapConfig.minZoom,
      maxZoom: this.mapConfig.maxZoom,
      detectRetina: true,
      attribution: '<a href="https://www.google.com/maps">谷歌地图</a> &copy;'
    });
    this.googleMaps = tileLayer('http://mt1.google.cn/vt/lyrs=m@207000000&hl=zh-CN&gl=CN&src=app&x={x}&y={y}&z={z}&s=Galile', {
      minZoom: this.mapConfig.minZoom,
      maxZoom: this.mapConfig.maxZoom,
      detectRetina: true,
      attribution: '<a href="https://www.google.com/maps">谷歌地图</a> &copy;'
    });
    this.center = latLng(36.69, 107.34);
    this.options = {
      layers: [
        this.autonaviMaps
      ],
      zoom: this.mapConfig.zoom,
      center: this.center,
      zoomSnap: 1.5,
    };
    this.layersControl = {
      'baseLayers': {
        '高德地图': this.autonaviMaps,
        '谷歌影像': this.googleSatelMaps,
        '谷歌地图': this.googleMaps
      }
    };
  }

  @Input()
  set pages(pages: Page[]) {
    this.layers = this.pageMarkerService.getMarkers(pages);
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
      this.fitBounds = new LatLngBounds([[this.center.lat, this.center.lng], [this.center.lat, this.center.lng]]);
    }
  }

  ngOnInit() {
  }

  onMapReady(map: Map) {

  }

}
