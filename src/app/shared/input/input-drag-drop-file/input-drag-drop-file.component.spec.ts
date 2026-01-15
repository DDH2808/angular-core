import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputDragDropFileComponent } from './input-drag-drop-file.component';

describe('InputDragDropFileComponent', () => {
  let component: InputDragDropFileComponent;
  let fixture: ComponentFixture<InputDragDropFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputDragDropFileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputDragDropFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
