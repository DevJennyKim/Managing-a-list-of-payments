import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentDetailsComponentComponent } from './payment-details-component.component';

describe('PaymentDetailsComponentComponent', () => {
  let component: PaymentDetailsComponentComponent;
  let fixture: ComponentFixture<PaymentDetailsComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentDetailsComponentComponent]
    });
    fixture = TestBed.createComponent(PaymentDetailsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
