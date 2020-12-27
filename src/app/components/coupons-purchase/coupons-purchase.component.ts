import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Coupon } from 'src/app/models/Coupon';
import { CustomerService } from 'src/app/services/customer.service';
import { CheckingDialogComponent } from '../checking-dialog/checking-dialog.component';

@Component({
  selector: 'app-coupons-purchase',
  templateUrl: './coupons-purchase.component.html',
  styleUrls: ['./coupons-purchase.component.css']
})
export class CouponsPurchaseComponent implements OnInit {
  coupons: Coupon[];
  customerCoupons: Coupon[] = [];
  constructor(private customerService: CustomerService , public dialog: MatDialog) { }

  ngOnInit(): void {
    this.customerService.getAllCoupons().subscribe(
      (res) => { this.coupons = res; },
      (err) => { alert(err.error); });

    this.customerService.getAllCustomersCoupons().subscribe(
      (res) => { this.customerCoupons = res; },
      (err) => { alert(err.error); });
  }

  public purchaseCoupon(coupon: Coupon): void {
    this.openPurchaseDialog(coupon);
  }

  public openPurchaseDialog(coupon: Coupon) {
    const dialogRef = this.dialog.open(CheckingDialogComponent, {data: {action: 'Purchase'}});
    dialogRef.afterClosed().subscribe(
      (res) => {if(res){
        this.customerService.purchaseCoupon(coupon).subscribe(
          () => { const changeCoupon = this.coupons.find(item => item.id === coupon.id);
            changeCoupon.amount--;
          this.customerCoupons.push(changeCoupon); },
          (err) => {alert(err.error) });
      }})
  }

  public isCouponExist(couponId: number): boolean {
    const foundCoupon = this.customerCoupons.find(item => item.id === couponId);
    if(foundCoupon){
      return true;
    }
    return false;
  }

}
