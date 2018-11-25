import { Injectable } from '@angular/core';
import { LatLng, MapOptions, Layer, LatLngBounds, TileLayer, tileLayer, latLng } from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  mapConfig: { minZoom: number, maxZoom: number, zoom: number };
  center: LatLng;
  _baseLayer: () => TileLayer;

  autonaviMaps(): TileLayer {
    return tileLayer('https://webrd02.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}', {
      minZoom: this.mapConfig.minZoom,
      maxZoom: this.mapConfig.maxZoom,
      // detectRetina: true,
      attribution: '<a href="https://ditu.amap.com/">高德地图</a> &copy;'
    });
  }

  googleSatelMaps(): TileLayer {
    return tileLayer('http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}', {
      minZoom: this.mapConfig.minZoom,
      maxZoom: this.mapConfig.maxZoom,
      detectRetina: true,
      attribution: '<a href="https://www.google.com/maps">谷歌地图</a> &copy;'
    });
  }

  googleMaps(): TileLayer {
    return tileLayer('http://mt1.google.cn/vt/lyrs=m@207000000&hl=zh-CN&gl=CN&src=app&x={x}&y={y}&z={z}&s=Galile', {
      minZoom: this.mapConfig.minZoom,
      maxZoom: this.mapConfig.maxZoom,
      detectRetina: true,
      attribution: '<a href="https://www.google.com/maps">谷歌地图</a> &copy;'
    });
  }

  constructor() {
    this.mapConfig = { minZoom: 3, maxZoom: 16, zoom: 4 };
    this._baseLayer = this.autonaviMaps;
    this.center = latLng(36.69, 107.34);
  }

  get baseLayer() {
    return this._baseLayer();
  }
}
