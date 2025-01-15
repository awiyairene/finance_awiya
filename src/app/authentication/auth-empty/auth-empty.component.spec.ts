import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthEmptyComponent } from './auth-empty.component';

describe('AuthEmptyComponent', () => {
  let component: AuthEmptyComponent;
  let fixture: ComponentFixture<AuthEmptyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthEmptyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AuthEmptyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
