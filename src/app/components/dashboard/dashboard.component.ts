import {Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {MainSketchComponent} from "../../layouts/main-sketch/main-sketch.component";
import {StatsReport} from "../../models/stats-report";
import {DEFAULT_COLORS} from "../../models/utils";
import {StatsReportItemComponent} from "./stats-report-item/stats-report-item.component";
import {TransactionService} from "../../services/transaction.service";
import {NotifyService} from "../../services/notify.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {Subject, takeUntil} from "rxjs";
import {ChartData} from "../../models/chart-data";
import {LineChartComponent} from "../line-chart/line-chart.component";
import {NgClass, NgIf} from "@angular/common";

export enum ChartInterval {
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY',
  QUARTERLY = 'QUARTERLY'
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MainSketchComponent,
    StatsReportItemComponent,
    LineChartComponent,
    NgIf,
    NgClass
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit, OnDestroy {

  statsReport: StatsReport = {
    expensesCount: 0, expensesTotalAmount: 0, recipesCount: 0, recipesTotalAmount: 0
  };
  chartData: ChartData;
  interval: ChartInterval = ChartInterval.WEEKLY;
  defaultColors = DEFAULT_COLORS;

  transactionService = inject(TransactionService);
  notifyService = inject(NotifyService);
  isChartDataLoading = signal<boolean>(false);

  private destroy$ = new Subject<void>();


  constructor() {
  }

  ngOnInit(): void {
    this.generateStatsReport();
    this.launchWeeklyChartData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  generateStatsReport(): void {
    this.transactionService.getStatsReport()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
      {
        next: (report) => {
          //console.log(report)
          this.statsReport = report;
        },
        error: (error) => {
          this.notifyService.openDefault('Erreur lors de la récupération des données', "OK");
        }
      }
    );
  }

  launchWeeklyChartData() {
    this.interval = ChartInterval.WEEKLY;

    this.isChartDataLoading.set(true);
    this.transactionService.getWeeklyData().subscribe(
      {
        next: value => {
          //console.log(value);
          this.chartData = value;
          this.isChartDataLoading.set(false);
        },
        error: (error) => {
          this.notifyService.openDefault('Erreur lors de la récupération des données du graphe', "OK");
          this.isChartDataLoading.set(false);
        }
      }
    )
  }

  launchMonthlyChartData() {
    this.interval = ChartInterval.MONTHLY;

    this.isChartDataLoading.set(true);
    this.transactionService.getMonthlyData().subscribe(
      {
        next: value => {
          //console.log(value);
          this.chartData = value;
          this.isChartDataLoading.set(false);
        },
        error: (error) => {
          this.notifyService.openDefault('Erreur lors de la récupération des données du graphe', "OK");
          this.isChartDataLoading.set(false);
        }
      }
    )
  }

  launchQuarterlyChartData() {
    this.interval = ChartInterval.QUARTERLY;

    this.isChartDataLoading.set(true);
    this.transactionService.getQuarterlyData().subscribe(
      {
        next: value => {
          //console.log(value);
          this.chartData = value;
          this.isChartDataLoading.set(false);
        },
        error: (error) => {
          this.notifyService.openDefault('Erreur lors de la récupération des données du graphe', "OK");
          this.isChartDataLoading.set(false);
        }
      }
    )
  }

  hasWeekData() {
    return this.interval == ChartInterval.WEEKLY
  }

  hasMonthData() {
    return this.interval == ChartInterval.MONTHLY
  }

  hasQuarterData() {
    return this.interval == ChartInterval.QUARTERLY

  }
}
