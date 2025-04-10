import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { GoogleMapsModule } from '@angular/google-maps';

@Component({
  selector: 'app-gio-location',
  imports: [ GoogleMapsModule,NgIf,HttpClientModule],
  templateUrl: './gio-location.component.html',
  styleUrl: './gio-location.component.css'
})
export class GioLocationComponent {
  center: google.maps.LatLngLiteral = { lat: 18.5204, lng: 73.8567 };
  markerPosition: google.maps.LatLngLiteral | null = null;
  zoom = 12;
  address: string = '';
  private apiKey = 'AIzaSyCNEAfuz74LokwTkZKpLThn8Bc537-bBDA';
  constructor(private http: HttpClient) {}
  get_address_from(lat: number, lng: number) {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${this.apiKey}`;
    return this.http.get<any>(url);
  }
  select_location(event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      this.markerPosition = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      };
      this.get_address_from(this.markerPosition.lat, this.markerPosition.lng)
        .subscribe((res:any) => {
          if (res.status === 'OK') {
            this.address = res.results[0]?.formatted_address || 'No address found';
          } else {
            this.address = 'Unable to fetch address';
          }
        });
    }
  }
}
