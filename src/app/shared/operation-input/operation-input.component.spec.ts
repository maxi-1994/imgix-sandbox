import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationInputComponent } from './operation-input.component';

describe('OperationInputComponent', () => {
  let component: OperationInputComponent;
  let fixture: ComponentFixture<OperationInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ OperationInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperationInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
