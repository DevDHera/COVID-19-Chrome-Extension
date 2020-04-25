import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Papa } from 'ngx-papaparse';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label, Color } from 'ng2-charts';

import { ApiService } from '../../../../services/api.service';

@Component({
  selector: 'app-popup-chart',
  templateUrl: './popup-chart.component.html',
  styleUrls: ['./popup-chart.component.scss'],
})
export class PopupChartComponent implements OnInit {
  @Output() loadCharts = new EventEmitter();

  isLoading = true;
  isError = false;
  datesDataSet: string[];
  totalCasesDataSet: string[];
  deathsDataSet: string[];
  recoveriesDataSet: string[];
  public lineChartData: ChartDataSets[] = [];
  public lineChartLabels: Label[] = [];
  public lineChartOptions: ChartOptions & { annotation: any } = {
    responsive: true,
    scales: {
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        },
      ],
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno',
          },
        },
      ],
    },
  };
  public lineChartColors: Color[] = [
    {
      // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)',
    },
    {
      // green
      backgroundColor: 'rgba(80,205,138,0.2)',
      borderColor: 'rgba(80,205,138,1)',
      pointBackgroundColor: 'rgba(80,205,138,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(80,205,138,1)',
    },
    {
      // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';

  constructor(private apiService: ApiService, private papa: Papa) {}

  ngOnInit() {
    this.apiService.getCsvStats().subscribe(
      (data) => {
        this.papa.parse(data, {
          header: false,
          delimiter: ',',
          skipEmptyLines: true,
          complete: (result) => {
            [
              this.datesDataSet,
              this.totalCasesDataSet,
              this.deathsDataSet,
              this.recoveriesDataSet,
            ] = result.data;

            this.populateChartData();
          },
        });
      },
      (error) => {
        this.isLoading = false;
        this.isError = true;
      }
    );
  }

  populateChartData() {
    const totalCases = [];
    const recoveries = [];
    const deaths = [];
    let i;
    for (i = 0; i <= this.datesDataSet.length; i += 7) {
      this.lineChartLabels.push(this.datesDataSet[i]);
      totalCases.push(this.totalCasesDataSet[i]);
      recoveries.push(this.recoveriesDataSet[i]);
      deaths.push(this.deathsDataSet[i]);
    }

    // Add Current Date
    if (i !== this.datesDataSet.length) {
      this.lineChartLabels.push(
        this.datesDataSet[this.datesDataSet.length - 1]
      );
      totalCases.push(this.totalCasesDataSet[this.datesDataSet.length - 1]);
      recoveries.push(this.recoveriesDataSet[this.datesDataSet.length - 1]);
      deaths.push(this.deathsDataSet[this.datesDataSet.length - 1]);
    }

    this.lineChartData.push(
      { data: totalCases, label: 'Total Cases' },
      { data: recoveries, label: 'Recoveries' },
      { data: deaths, label: 'Deats' }
    );
    this.isLoading = false;
  }

  loadCardsView() {
    this.loadCharts.emit(false);
  }
}
