import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: 'popup.component.html',
  styleUrls: ['popup.component.scss'],
})
export class PopupComponent implements OnInit {
  loadCharts = false;

  constructor() {}

  ngOnInit() {}

  onLoadChartsView(flag: boolean) {
    this.loadCharts = flag;
  }
}
