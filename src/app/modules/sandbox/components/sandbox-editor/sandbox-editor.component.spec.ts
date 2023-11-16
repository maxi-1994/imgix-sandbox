import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SandboxEditorComponent } from './sandbox-editor.component';

describe('SandboxEditorComponent', () => {
  let component: SandboxEditorComponent;
  let fixture: ComponentFixture<SandboxEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SandboxEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SandboxEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
