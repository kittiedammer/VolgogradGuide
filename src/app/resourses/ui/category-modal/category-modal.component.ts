import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { LocationType } from '../../psevdoDB';
import { MapService } from '../../services/map.service';

@Component({
  selector: 'app-category-modal',
  templateUrl: './category-modal.component.html',
  styleUrls: ['./category-modal.component.scss'],
})
export class CategoryModalComponent implements OnInit, OnDestroy {
  
  private subscription: Subscription;
  choseAll: boolean;

  locationsType: Map<string, boolean> = new Map();

  constructor(
    private modalCtrl: ModalController,
    private mapService: MapService,
  ) {}

  ngOnInit() {
    this.subscription = this.mapService.mapFilters$.subscribe(
      r => {
        for (let item in LocationType) r.has(item) ? this.locationsType.set(item, true) : this.locationsType.set(item, false);
        let x = new Set (this.locationsType.values());
        if(!x.has(false)) {
          this.choseAll = true;
        }
        else if(x.has(false)) {
          this.choseAll = false;
        };
      }
    )
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  public selectItem(name: string) {
    this.locationsType.set(name, !this.locationsType.get(name));
    let x = new Set (this.locationsType.values());
    if(!x.has(false)) {
      this.choseAll = true;
    }
    else if(x.has(false)) {
      this.choseAll = false;
    };
  }
/*
  public get canSubmit(): boolean {
    let x = new Set (this.locationsType.values());
    return x.has(true);
  }
*/
  public updateMapMarkers() {
    let filters: Set<string> = new Set();
    this.locationsType.forEach((value: boolean, key: string) => {
      if (value) filters.add(key);
    });
    this.mapService.reDrawMarkers(filters);
    this.modalCtrl.dismiss();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public chooseAllAction(e) {
    this.choseAll = e;
    if(!e) {
        this.locationsType.forEach(
          (value: boolean, key: string) => {
            if (!value) this.locationsType.set(key, true);
      });
    }
    else {
      this.locationsType.forEach(
        (value: boolean, key: string) => {
          if (value) this.locationsType.set(key, false)
        });
    }
  }

}
