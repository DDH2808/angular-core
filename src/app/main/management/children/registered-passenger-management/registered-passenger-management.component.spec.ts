import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredPassengerManagementComponent } from './registered-passenger-management.component';

describe('RegisteredPassengerManagementComponent', () => {
  let component: RegisteredPassengerManagementComponent;
  let fixture: ComponentFixture<RegisteredPassengerManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisteredPassengerManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisteredPassengerManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
