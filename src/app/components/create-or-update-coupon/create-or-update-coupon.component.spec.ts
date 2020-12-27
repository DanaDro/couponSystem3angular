import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrUpdateCouponComponent } from './create-or-update-coupon.component';

describe('CreateOrUpdateCouponComponent', () => {
  let component: CreateOrUpdateCouponComponent;
  let fixture: ComponentFixture<CreateOrUpdateCouponComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateOrUpdateCouponComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOrUpdateCouponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
