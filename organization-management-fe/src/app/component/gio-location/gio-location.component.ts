import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';

@Component({
  selector: 'app-gio-location',
  imports: [ GoogleMapsModule,NgIf],
  templateUrl: './gio-location.component.html',
  styleUrl: './gio-location.component.css'
})
export class GioLocationComponent {
  center: google.maps.LatLngLiteral = { lat: 18.5204, lng: 73.8567 };
  markerPosition: google.maps.LatLngLiteral | null = null;
  zoom = 12;

  selectLocation(event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      this.markerPosition = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      };
    }
  }
}
