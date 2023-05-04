import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSessionHandlingComponent } from './edit-session-handling.component';

describe('EditSessionHandlingComponent', () => {
  let component: EditSessionHandlingComponent;
  let fixture: ComponentFixture<EditSessionHandlingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSessionHandlingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSessionHandlingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
