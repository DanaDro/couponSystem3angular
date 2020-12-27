import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckingDialogComponent } from './checking-dialog.component';

describe('CheckingDialogComponent', () => {
  let component: CheckingDialogComponent;
  let fixture: ComponentFixture<CheckingDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckingDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
