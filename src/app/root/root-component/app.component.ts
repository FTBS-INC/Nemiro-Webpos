import { Component, OnInit, Renderer2, AfterViewInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import * as data from "../../../assets/settings.json";
import { GlobalService } from 'src/app/shared/services';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

@Injectable()
export class AppComponent implements OnInit, AfterViewInit {
  isMultiColorActive = environment.isMultiColorActive;
  constructor(
    private renderer: Renderer2,
    public global: GlobalService
  ) {

  }

  ngOnInit() {
    this.getScaleTypes();

    // $("#notificationTemplate").modal("show");
  }

  ngAfterViewInit() {

    setTimeout(() => {
      this.renderer.addClass(document.body, "show");
    }, 1000);
    setTimeout(() => {
      this.renderer.addClass(document.body, "default-transition");
    }, 1500);
  }
  getScaleTypes() {
    this.global.settings = data['default'];
    //
    // this.getJSON("./assets/settings.json")
    //   .subscribe((response) => {
    //
    //     this.global.settings = response;
    //   }, (error) => {
    //
    //   });
  }
}
