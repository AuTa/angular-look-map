import { Component, OnInit, Input, AfterContentInit, NgZone } from '@angular/core';
import { Page } from '../page-detail/page';
import { Layer, latLng, LatLng, MapOptions, marker, Marker, tileLayer } from 'leaflet';
import { LeafletDirective } from '@asymmetrik/ngx-leaflet';
import { MapService } from '../_services/map.service';

@Component({
  selector: 'app-page-content',
  templateUrl: './page-content.component.html',
  styleUrls: ['./page-content.component.css']
})
export class PageContentComponent implements OnInit, AfterContentInit {

  @Input() page: Page;

  center: LatLng;
  options: MapOptions;
  marker: Marker;

  isEditing = false;

  constructor(private mapService: MapService, private zone: NgZone) {
    this.center = this.mapService.center;
  }

  ngAfterContentInit() {
    this.center = latLng(this.page.latitude, this.page.longitude);
    this.marker = marker(this.center, {draggable: true});
    this.marker.options['autoPan'] = true;
    this.marker.on('dragend', (ev) => this.zone.run(() => this.markerOnMove(ev)));
    this.options = {
      layers: [
        this.mapService.baseLayer
      ],
      center: this.center,
      zoom: 14,
      zoomSnap: 1.5,
      attributionControl: false,
    };

   }

  ngOnInit() {

  }

  markerOnMove(ev) {
    this.page.latitude = this.marker.getLatLng().lat;
    this.page.longitude = this.marker.getLatLng().lng;
  }

  updateLatLng() {
    this.marker.setLatLng([this.page.latitude, this.page.longitude]);
  }

}
