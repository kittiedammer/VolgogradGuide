import { Component } from '@angular/core';
import { MapService } from './resourses/services/map.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private mapService: MapService
  ) {}

  ngOnInit() {
    
  }
}
