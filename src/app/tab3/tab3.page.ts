import { Component, ViewChild } from '@angular/core';
import { Video360Component } from '../video360/video360.component';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  @ViewChild(Video360Component) videoComp:Video360Component;

  constructor() {}

  ionViewWillLeave() {
    this.videoComp.exit()
  }
}
