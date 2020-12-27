import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrUpdateDialogCustomerComponent } from './create-or-update-dialog-customer.component';

describe('CreateOrUpdateDialogComponent', () => {
  let component: CreateOrUpdateDialogCustomerComponent;
  let fixture: ComponentFixture<CreateOrUpdateDialogCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateOrUpdateDialogCustomerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOrUpdateDialogCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
