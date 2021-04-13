import { ElementRef, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import * as mapboxgl from 'mapbox-gl';
import { DATABASE, LocationType, Places } from '../psevdoDB';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  mapBox: mapboxgl.Map;
  private markers: mapboxgl.Marker[] = [];
  private isMapLoading: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private mapFilters: ReplaySubject<Set<string>> = new ReplaySubject(0);

  constructor() {
    this.initFilters();
  }

  private initFilters(): void {
    let filters: Set<string> = new Set();
    for (let item in LocationType) filters.add(item);
    this.setMapFilters(filters);
  }

  public initMap(map: ElementRef) {
    this.mapBox = new mapboxgl.Map({
      container: map.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [44.513792, 48.712794],
      zoom: 13
    });
    this.mapBox.addControl(new mapboxgl.NavigationControl(), 'top-right');
    this.initMarkers();
    this.setMapLoadingState(true);
  }

  private initMarkers(): void {
    const places: Places[] = DATABASE;
    places.forEach(
      el => {
        this.markers.push(new mapboxgl.Marker({color: this.getMarkerColor(el.type)}).setLngLat([el.lng, el.lat]).addTo(this.mapBox));
        this.markers[this.markers.length - 1].getElement().addEventListener('click', () => alert(el.title));
      }
    )
  }

  public setMapLoadingState(state: boolean) {
    this.isMapLoading.next(state);
  }

  public get mapState$(): Observable<boolean> {
    return this.isMapLoading.pipe();
  }

  public setMapFilters(args: Set<string>) {
    this.mapFilters.next(args);
  }

  public get mapFilters$(): Observable<Set<string>> {
    return this.mapFilters.pipe();
  }

  public reDrawMarkers(filters: Set<string>): void {
    this.cleanAllMarkers();
    this.setMapFilters(filters);
    this.mapFilters$.subscribe(r => {

    })
    const places: Places[] = DATABASE.filter(el => filters.has(el.type));
    places.forEach(
      el => {
        this.markers.push(new mapboxgl.Marker({color: this.getMarkerColor(el.type)}).setLngLat([el.lng, el.lat]).addTo(this.mapBox));
        this.markers[this.markers.length - 1].getElement().addEventListener('click', () => alert(el.title));
      }
    )
  }

  private cleanAllMarkers(): void {
    this.markers.forEach(el => el.remove());
    this.markers = [];
  }

  private getMarkerColor(type: LocationType): string {
    switch(type) {
      case LocationType.attraction: return "#28ba62";
      case LocationType.restaurant: return "#eb445a";
      case LocationType.shop: return "#e0ac08";
      default: return "#3dc2ff";
    }
  }
}
