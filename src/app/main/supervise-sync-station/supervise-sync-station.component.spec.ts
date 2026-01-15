import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperviseSyncStationComponent } from './supervise-sync-station.component';

describe('SuperviseSyncStationComponent', () => {
  let component: SuperviseSyncStationComponent;
  let fixture: ComponentFixture<SuperviseSyncStationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuperviseSyncStationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuperviseSyncStationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
