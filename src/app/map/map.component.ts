import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import * as mapboxgl from 'mapbox-gl';
import { Subscription } from 'rxjs';
import { MapService } from '../resourses/services/map.service';
import { CategoryModalComponent } from '../resourses/ui/category-modal/category-modal.component';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, OnDestroy {

  private subscription: Subscription;

  @ViewChild('map') map: ElementRef;
  constructor(
    public navCtrl: NavController,
    private mapService: MapService,
    private modalCtrl: ModalController
  ) {
    Object.getOwnPropertyDescriptor(mapboxgl, "accessToken").set('pk.eyJ1Ijoia2l0dGllZGFtbWVyIiwiYSI6ImNrbjlnaG9qYzBkbzcycG1ycDZoc2tqcWIifQ.zryIuYAoB89y_3Wjpr_HPg');
  }

  ionViewDidEnter() {
    this.subscription = this.mapService.mapState$.subscribe(r => { if (!r) this.mapService.initMap(this.map); })
  }

  ngOnInit() {}

  async categoryMenuInit() {
    const modal = await this.modalCtrl.create({
      component: CategoryModalComponent
    });
    return await modal.present();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
