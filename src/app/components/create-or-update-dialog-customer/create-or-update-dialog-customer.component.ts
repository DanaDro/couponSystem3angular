import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Customer } from '../../models/Customer';

export interface DialogData {
  coupons: import("c:/Users/danad/Downloads/JohnBryce/Website/Web/couponSystem/src/app/Models/Coupon").Coupon[];
  customer: Customer;
  type: string;

}
@Component({
  selector: 'app-create-or-update-dialog-customer',
  // without -custoemr in the selector
  templateUrl: './create-or-update-dialog-customer.component.html',
  styleUrls: ['./create-or-update-dialog-customer.component.css',]
})
export class CreateOrUpdateDialogCustomerComponent implements OnInit {

  type: string;
  customer = new Customer();
  origin = new Customer();

  ngOnInit(): void {
  }

  constructor(public dialogRef: MatDialogRef<CreateOrUpdateDialogCustomerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {

    this.smartCopy(data.customer);
    this.type = data.type;
  }

  public smartCopy(customer: Customer): void {
    if (customer) {
      this.customer.id = customer.id;
      this.customer.lastName = customer.lastName;
      this.customer.firstName = customer.firstName;
      this.customer.email = customer.email;
      this.customer.password = customer.password;
      this.customer.coupons = customer.coupons;

      this.origin.id = this.customer.id;
      this.origin.lastName = this.customer.lastName;
      this.origin.firstName = this.customer.firstName;
      this.origin.email = this.customer.email;
      this.origin.password = this.customer.password;
      this.origin.coupons = this.customer.coupons;

    } else {
      this.customer.id = 0;
      this.customer.lastName = '';
      this.customer.firstName = '';
      this.customer.email = '';
      this.customer.password = '';
      this.customer.coupons = [];
    }
  }

  public checkChanges(origin: Customer, customer: Customer): boolean {
    return JSON.stringify(origin) === JSON.stringify(customer);
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }
}
