import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomToastNotifyComponent } from './custom-toast-notify.component';

describe('CustomToastNotifyComponent', () => {
  let component: CustomToastNotifyComponent;
  let fixture: ComponentFixture<CustomToastNotifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomToastNotifyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomToastNotifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
