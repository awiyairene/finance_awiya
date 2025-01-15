import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainSketchComponent } from './main-sketch.component';

describe('MainSketchComponent', () => {
  let component: MainSketchComponent;
  let fixture: ComponentFixture<MainSketchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainSketchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainSketchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
