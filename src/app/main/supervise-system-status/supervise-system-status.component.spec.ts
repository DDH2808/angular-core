import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperviseSystemStatusComponent } from './supervise-system-status.component';

describe('SuperviseSystemStatusComponent', () => {
  let component: SuperviseSystemStatusComponent;
  let fixture: ComponentFixture<SuperviseSystemStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuperviseSystemStatusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuperviseSystemStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
