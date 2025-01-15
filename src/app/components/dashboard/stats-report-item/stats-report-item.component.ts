import {ChangeDetectionStrategy, Component, Input, input} from '@angular/core';
import {CurrencyPipe} from "@angular/common";

@Component({
  selector: 'app-stats-report-item',
  standalone: true,
  imports: [
    CurrencyPipe
  ],
  templateUrl: './stats-report-item.component.html',
  styleUrl: './stats-report-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatsReportItemComponent {

  @Input() bgColor!: string;
  @Input() designation!: string;
  @Input() dataValue!: string;
  @Input() isAmount: boolean = false;

}
