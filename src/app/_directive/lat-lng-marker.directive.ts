import { Directive, Input, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[latLngMarker]'
})
export class LatLngMarkerDirective {

  @Input() latitude: number;
  @Output() latitudeChange = new EventEmitter<number>();

  @Input() longitude: number;
  @Output() longitudeChange = new EventEmitter<number>();

  constructor() { }

}
