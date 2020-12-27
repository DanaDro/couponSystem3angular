import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrUpdateDialogCompanyComponent } from './create-or-update-dialog-company.component';

describe('CreateOrUpdateDialogCompanyComponent', () => {
  let component: CreateOrUpdateDialogCompanyComponent;
  let fixture: ComponentFixture<CreateOrUpdateDialogCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateOrUpdateDialogCompanyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOrUpdateDialogCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
