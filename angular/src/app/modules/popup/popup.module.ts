import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CountUpModule } from 'ngx-countup';

import { PopupComponent } from './pages/popup/popup.component';
import { PopupChartComponent } from './pages/popup-chart/popup-chart.component';
import { PopupCardsComponent } from './pages/popup-cards/popup-cards.component';
import { PopupRoutingModule } from './popup-routing.module';

@NgModule({
  declarations: [PopupComponent, PopupCardsComponent, PopupChartComponent],
  imports: [CommonModule, PopupRoutingModule, CountUpModule],
})
export class PopupModule {}
