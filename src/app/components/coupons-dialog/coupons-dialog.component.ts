import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Coupon } from 'src/app/Models/Coupon';

export interface DialogData {
  coupons: Coupon[];
}

@Component({
  selector: 'app-coupons-dialog',
  templateUrl: './coupons-dialog.component.html',
  styleUrls: ['./coupons-dialog.component.css']
})
export class CouponsDialogComponent implements OnInit {

  public coupons: Coupon[];

  constructor(public dialogRef: MatDialogRef<CouponsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.coupons = data.coupons;
  }
s
  ngOnInit(): void {
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

}
