import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponsPurchaseComponent } from './coupons-purchase.component';

describe('CouponsPurchaseComponent', () => {
  let component: CouponsPurchaseComponent;
  let fixture: ComponentFixture<CouponsPurchaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CouponsPurchaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CouponsPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
