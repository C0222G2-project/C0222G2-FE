import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordLoginComponent } from './forgot-password-login.component';

describe('ForgotPasswordLoginComponent', () => {
  let component: ForgotPasswordLoginComponent;
  let fixture: ComponentFixture<ForgotPasswordLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotPasswordLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
