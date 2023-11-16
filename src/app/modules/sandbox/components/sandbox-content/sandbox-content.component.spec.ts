import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SandboxContentComponent } from './sandbox-content.component';

describe('SandboxContentComponent', () => {
  let component: SandboxContentComponent;
  let fixture: ComponentFixture<SandboxContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SandboxContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SandboxContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
