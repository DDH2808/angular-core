import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffCenterComponent } from './staff-center.component';

describe('StaffCenterComponent', () => {
  let component: StaffCenterComponent;
  let fixture: ComponentFixture<StaffCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StaffCenterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StaffCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
