import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPaymentComponentComponent } from './edit-payment-component.component';

describe('EditPaymentComponentComponent', () => {
  let component: EditPaymentComponentComponent;
  let fixture: ComponentFixture<EditPaymentComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditPaymentComponentComponent]
    });
    fixture = TestBed.createComponent(EditPaymentComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
