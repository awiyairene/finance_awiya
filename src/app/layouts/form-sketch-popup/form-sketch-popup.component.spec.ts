import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSketchPopupComponent } from './form-sketch-popup.component';

describe('FormSketchPopupComponent', () => {
  let component: FormSketchPopupComponent;
  let fixture: ComponentFixture<FormSketchPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormSketchPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormSketchPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
