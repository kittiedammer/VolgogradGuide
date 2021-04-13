import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import videojs from 'video.js';
import 'videojs-vr/dist/videojs-vr.js';
import { HostListener } from "@angular/core";

@Component({
  selector: 'app-video360',
  templateUrl: './video360.component.html',
  styleUrls: ['./video360.component.scss'],
})
export class Video360Component implements OnInit, AfterViewInit {

  screenHeight: number;
  screenWidth: number;
  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    this.screenWidth = window.innerWidth - 10;
  }

  public url: string;
  private readonly config: any;
  private player: videojs;
  @ViewChild('my_video')
  private element: ElementRef;

  constructor() {
    this.onResize();
    // video.js configuration
    this.config = {
      controls: true,
      autoplay: true,
      fluid: false,
      loop: false,
      width: this.screenWidth > 640 ? 640 : this.screenWidth,
      height: this.screenWidth > 640 ? 480 : Math. round(this.screenWidth/4*3)
    };
  }

  ngOnInit() {
    this.url = "https://dm0qx8t0i9gc9.cloudfront.net/watermarks/videoGTYSdDW/videoblocks-gold-coast-beach-360-vr-aerial_S912xpX6-__b6a53e60e0596e814af1350c791d99ae__P640.mp4";
  }

  // using ngAfterViewInit so that videojs element
  // after the component template itself has been rendered
  ngAfterViewInit() {

    // setup the player
    this.player = videojs(this.element.nativeElement, this.config, () => {
      this.player.src(this.url);
      this.player.vr({ projection: '360' });
    });

    // error handling
    this.player.on('error', (error) => {
      console.warn(error);
    });
  }

  exit() {
    this.player.pause();
  }
}
