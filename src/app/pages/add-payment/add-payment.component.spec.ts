import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPaymentComponent } from './add-payment.component';

describe('AddPaymentComponentComponent', () => {
  let component: AddPaymentComponent;
  let fixture: ComponentFixture<AddPaymentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddPaymentComponent],
    });
    fixture = TestBed.createComponent(AddPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
