import { Injectable } from '@angular/core';
import { LatLng, MapOptions, Layer, LatLngBounds, TileLayer, tileLayer, latLng, Control } from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  mapConfig: { minZoom: number, maxZoom: number, zoom: number };
  center: LatLng;
  _baseLayer: string;
  _baseLayers: { [key: string]: { 'urlTemplate': string, 'options': { 'detectRetina': boolean, 'attribution': string }; }; };

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
    this._baseLayers = {
      高德地图: {
        urlTemplate: 'https://webrd02.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}',
        options: {
          detectRetina: false,
          attribution: '<a href="https://ditu.amap.com/">高德地图</a> &copy;'
        }
      },
      谷歌影像: {
        urlTemplate: 'http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}',
        options: {
          detectRetina: true,
          attribution: '<a href="https://www.google.com/maps">谷歌地图</a> &copy;'
        }
      },
      谷歌地图: {
        urlTemplate: 'http://mt1.google.cn/vt/lyrs=m@207000000&hl=zh-CN&gl=CN&src=app&x={x}&y={y}&z={z}&s=Galile',
        options: {
          detectRetina: true,
          attribution: '<a href="https://www.google.com/maps">谷歌地图</a> &copy;'
        }
      }
    };
    this._baseLayer = '高德地图';
    this.center = latLng(36.69, 107.34);
  }

  _baseLayerHandler(name) {
    const layer = this._baseLayers[name];
    return tileLayer(layer.urlTemplate, Object.assign({
      minZoom: this.mapConfig.minZoom,
      maxZoom: this.mapConfig.maxZoom,
    }, layer.options));
  }

  get baseLayer() {
    return this._baseLayerHandler(this._baseLayer);
  }

  get baseLayers(): Control.LayersObject {
    const layers = {};
    for (const name in this._baseLayers) {
      if (this._baseLayers.hasOwnProperty(name)) {
        layers[name] = this._baseLayerHandler(name);
      }
    }
    return layers;
  }

  setBaseLayer(name: string) {
    this._baseLayer = name;
  }

}
