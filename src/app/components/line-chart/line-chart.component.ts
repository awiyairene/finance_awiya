import {Component, Input, OnInit} from '@angular/core';
import {ChartDataset, ChartOptions, Color, LabelItem} from "chart.js";
import {NgChartsModule} from "ng2-charts";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [
    NgChartsModule,
    CommonModule
  ],
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.scss'
})
export class LineChartComponent implements OnInit {
  @Input() xLabels: any[] = [];
  @Input() expensesData: number[] = [];
  @Input() recipesData: number[] = [];

  public lineChartColors: any[] = [
    {
      borderColor: 'rgba(255,99,132,1)',
      backgroundColor: 'rgba(255,99,132,0.2)',
      pointBackgroundColor: 'rgba(255,99,132,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(255,99,132,1)'
    },
    {
      borderColor: 'rgba(54,162,235,1)',
      backgroundColor: 'rgba(54,162,235,0.2)',
      pointBackgroundColor: 'rgba(54,162,235,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(54,162,235,1)'
    }
  ];

  public lineChartData: ChartDataset[] = [
    {data: [], label: 'Dépenses'},
    {data: [], label: 'Recettes'}
  ];

  public lineChartLabels: LabelItem[] = [];
  public lineChartOptions: ChartOptions = {
    responsive: true,
    animation: {
      duration: 5000,
      easing: 'easeInOutQuad'
    },
    elements: {
      point: {
        radius: 5,
        borderWidth: 2,
        hoverRadius: 7,
        hoverBorderWidth: 3
      },
      line: {
        tension: 0.4
      }
    }
  };
  public lineChartLegend = true;

  ngOnInit(): void {
    this.lineChartLabels = this.xLabels
    this.lineChartData[0].data = this.expensesData;
    this.lineChartData[1].data = this.recipesData;
  }
}
