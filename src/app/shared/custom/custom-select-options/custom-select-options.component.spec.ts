import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomSelectOptionsComponent } from './custom-select-options.component';

describe('CustomSelectOptionsComponent', () => {
  let component: CustomSelectOptionsComponent;
  let fixture: ComponentFixture<CustomSelectOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomSelectOptionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomSelectOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
