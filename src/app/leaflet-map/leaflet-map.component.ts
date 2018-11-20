import { Component, OnInit, Input, Injector } from '@angular/core';
import { createCustomElement, NgElement, WithProperties } from '@angular/elements';

import { tileLayer, latLng, Map, circle, polygon, Layer, marker, LatLngBounds, LatLng, popup, LeafletMouseEvent } from 'leaflet';
import 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/images/marker-icon.png';

import { Page } from '../page-detail/page';
import { PagePopupComponent } from '../page-popup/page-popup.component';

@Component({
  selector: 'app-leaflet-map',
  templateUrl: './leaflet-map.component.html',
  styleUrls: ['./leaflet-map.component.css']
})
export class LeafletMapComponent implements OnInit {
  mapConfig = { minZoom: 3, maxZoom: 16, zoom: 4 };
  autonaviMaps = tileLayer('https://webrd02.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}', {
    minZoom: this.mapConfig.minZoom,
    maxZoom: this.mapConfig.maxZoom,
    detectRetina: true,
    attribution: '<a href="https://ditu.amap.com/">高德地图</a> &copy;'
  });
  googleSatelMaps = tileLayer('http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}', {
    minZoom: this.mapConfig.minZoom,
    maxZoom: this.mapConfig.maxZoom,
    detectRetina: true,
    attribution: '<a href="https://www.google.com/maps">谷歌地图</a> &copy;'
  });
  googleMaps = tileLayer('http://mt1.google.cn/vt/lyrs=m@207000000&hl=zh-CN&gl=CN&src=app&x={x}&y={y}&z={z}&s=Galile', {
    minZoom: this.mapConfig.minZoom,
    maxZoom: this.mapConfig.maxZoom,
    detectRetina: true,
    attribution: '<a href="https://www.google.com/maps">谷歌地图</a> &copy;'
  });
  center = latLng(36.69, 107.34);
  options = {
    layers: [
      this.autonaviMaps
    ],
    zoom: this.mapConfig.zoom,
    center: this.center,
    zoomSnap: 1.5,
  };
  layersControl = {
    baseLayers: {
      '高德地图': this.autonaviMaps,
      '谷歌影像': this.googleSatelMaps,
      '谷歌地图': this.googleMaps
    }
  };

  fitBounds: LatLngBounds;
  layers: Layer[];

  constructor() {
  }

  @Input()
  set pages(pages: Page[]) {
    this.layers = [];
    const latitudes: number[] = [];
    const longitudes: number[] = [];
    if (pages.length > 0) {
      pages.forEach(page => {
        const pageMaker = marker([page.latitude, page.longitude]);
        pageMaker.bindPopup(l => {
          const pagePopup: NgElement & WithProperties<PagePopupComponent> = document.createElement('popup-element') as any;
          pagePopup.addEventListener('closed', () => document.body.removeChild(pagePopup));
          pagePopup.page = '123';
          // Add to the DOM
          document.body.appendChild(pagePopup);
          return pagePopup;
        });
        pageMaker.on({
          mouseover: (ev: LeafletMouseEvent) => { alert(page.title + ev.latlng); },
        });
        this.layers.push(pageMaker);
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
      this.fitBounds = new LatLngBounds([[this.center.lat, this.center.lng]]);
    }
  }

  ngOnInit() {
  }

  onMapReady(map: Map) {

  }

}
