import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../../../../services/api.service';
import { Response } from '../../../../models/response';

@Component({
  selector: 'app-popup-cards',
  templateUrl: 'popup-cards.component.html',
  styleUrls: ['popup-cards.component.scss'],
})
export class PopupCardsComponent implements OnInit {
  @Output() loadCharts = new EventEmitter();

  message: string;
  stats: Response;
  currentDate = new Date();
  isLoading = false;
  isError = false;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.getStats();
  }

  getStats() {
    this.isLoading = true;
    this.apiService.getCurrentStats().subscribe(
      (response: Response) => {
        this.isLoading = false;
        this.stats = response;
      },
      (error) => {
        this.isLoading = false;
        this.isError = true;
      }
    );
  }

  loadChartsView() {
    this.loadCharts.emit(true);
  }
}
