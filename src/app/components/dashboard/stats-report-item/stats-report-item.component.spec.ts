import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsReportItemComponent } from './stats-report-item.component';

describe('StatsReportItemComponent', () => {
  let component: StatsReportItemComponent;
  let fixture: ComponentFixture<StatsReportItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatsReportItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatsReportItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
