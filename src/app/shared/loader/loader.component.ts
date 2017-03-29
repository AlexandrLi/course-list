import { LoaderService } from './loader.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'loader',
  template: `<div *ngIf="show" class="sk-circle">
  <div class="sk-circle1 sk-child"></div>
  <div class="sk-circle2 sk-child"></div>
  <div class="sk-circle3 sk-child"></div>
  <div class="sk-circle4 sk-child"></div>
  <div class="sk-circle5 sk-child"></div>
  <div class="sk-circle6 sk-child"></div>
  <div class="sk-circle7 sk-child"></div>
  <div class="sk-circle8 sk-child"></div>
  <div class="sk-circle9 sk-child"></div>
  <div class="sk-circle10 sk-child"></div>
  <div class="sk-circle11 sk-child"></div>
  <div class="sk-circle12 sk-child"></div>
</div>`,
  styleUrls: ['./loader.component.css'],
})

export class LoaderComponent {
  public show: boolean;

  constructor(private _loaderService: LoaderService) {
    this._loaderService.isShown.subscribe((isShown) => this.show = isShown);
  }
}
