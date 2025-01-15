import {ChangeDetectionStrategy, Component, EventEmitter, Input, input, model, Output} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {LaddaModule} from "angular2-ladda";
import {SearchFilter} from "../../models/search-filter";

@Component({
  selector: 'app-filter-data',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LaddaModule
  ],
  templateUrl: './filter-data.component.html',
  styleUrl: './filter-data.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterDataComponent {

  @Input()
  isLoading: boolean = false;

  @Input()
  searchFilter: SearchFilter;

  @Output()
  searchData: EventEmitter<any> = new EventEmitter<any>();

}
