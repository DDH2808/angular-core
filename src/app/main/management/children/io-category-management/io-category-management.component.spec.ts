import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IoCategoryManagementComponent } from './io-category-management.component';

describe('IoCategoryManagementComponent', () => {
  let component: IoCategoryManagementComponent;
  let fixture: ComponentFixture<IoCategoryManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IoCategoryManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IoCategoryManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
