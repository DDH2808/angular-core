import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryStaffComponent } from './history-staff.component';

describe('HistoryStaffComponent', () => {
  let component: HistoryStaffComponent;
  let fixture: ComponentFixture<HistoryStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HistoryStaffComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HistoryStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
