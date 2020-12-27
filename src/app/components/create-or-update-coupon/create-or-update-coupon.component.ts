import { Coupon } from '../../models/Coupon';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Company } from 'src/app/models/Company';

export interface DialogData {
  coupon: Coupon;
  company: Company;
  type: string;
}

@Component({
  selector: 'app-create-or-update-coupon',
  templateUrl: './create-or-update-coupon.component.html',
  styleUrls: ['./create-or-update-coupon.component.css']
})
export class CreateOrUpdateCouponComponent implements OnInit {

  public type: string;
  public coupon = new Coupon();
  public origin = new Coupon();
  public company: any;

  ngOnInit(): void {
  }

  constructor(public dialogRef: MatDialogRef<CreateOrUpdateCouponComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.smartCopy(data.coupon);
    this.type = data.type;
  }
  public smartCopy(coupon: Coupon): void {
    if (coupon) {
      this.coupon.id = coupon.id;
      this.coupon.companyId = coupon.companyId;
      this.coupon.category = coupon.category;
      this.coupon.title = coupon.title;
      this.coupon.description = coupon.description;
      this.coupon.startDate = coupon.startDate;
      this.coupon.endDate = coupon.endDate;
      this.coupon.amount = coupon.amount;
      this.coupon.price = coupon.price;
      this.coupon.image = coupon.image;

      this.origin.id = this.coupon.id;
      this.origin.companyId = this.coupon.companyId;
      this.origin.category = this.coupon.category;
      this.origin.title = this.coupon.title;
      this.origin.description = this.coupon.description;
      this.origin.startDate = this.coupon.startDate;
      this.origin.endDate = this.coupon.endDate;
      this.origin.amount = this.coupon.amount;
      this.origin.price = this.coupon.price;
      this.origin.image = this.coupon.image;

    } else {
      this.coupon.id;
      this.coupon.companyId;
      this.coupon.category;
      this.coupon.title;
      this.coupon.description;
      this.coupon.startDate;
      this.coupon.endDate;
      this.coupon.amount;
      this.coupon.price;
      this.coupon.image;
    }
  }

  public checkChanges(origin: Coupon, coupon: Coupon): boolean {
    return JSON.stringify(origin) === JSON.stringify(coupon);
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

}
