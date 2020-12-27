import { CustomerService } from './../../services/customer.service';

import { Customer } from '../../models/Customer';
import { Component, OnInit } from '@angular/core';
import { Coupon } from '../../models/Coupon';
import { CreateOrUpdateDialogCustomerComponent } from '../create-or-update-dialog-customer/create-or-update-dialog-customer.component';
import { CouponsDialogComponent } from '../coupons-dialog/coupons-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  public customers: Customer[];
  public customer: Customer;
  public coupons: Coupon[];
  public name: string;
  public maxPrice: number;
  public category: number;
  public categories = [
    '',
    'FOOD',
    'ELECTRICITY',
    'RESTAURANT',
    'VACATION',
    'GAMES',
    'CLOTH'
  ]

  public resultDialogCustomer: any;
  public resultDialogCoupon: any;
  public customerCoupons: Coupon[];


  constructor(private customerService: CustomerService, public dialog: MatDialog) { }

  ngOnInit(): void {

    this.name = this.customerService.customer.firstName + ' ' + this.customerService.customer.lastName;

    this.customerService.getAllCustomersCoupons().subscribe(
      (res) => {  this.customerCoupons = res;  this.coupons = this.customerCoupons; },
      (err) => { alert(err.error); });
  }

  public getCouponsByCategory(coupon: Coupon): void {
    this.customerService.getCouponsByCategory(coupon.category).subscribe(
      () => { this.coupons.filter(item => item.category === coupon.category); },
      (err) => { alert(err.message); });
  }

  public getCouponsByPrice(coupon: Coupon): void {
    this.customerService.getCouponsByCategory(coupon.price).subscribe(
      () => { this.coupons.filter(item => item.price === coupon.price); },
      (err) => { alert(err.message); });
  }

  public updateCustomer(customer: Customer): void {
    this.openDialogCustomer(customer);
  }


  public openDialogCustomer(customer: Customer): void {
    let type= 'Update';
    type = 'Update';

    const dialogRef = this.dialog.open(CreateOrUpdateDialogCustomerComponent, {
      width: '290px',
      data: { customer, type }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.resultDialogCustomer = result;

      if (type === 'Update') {
        console.log(this.resultDialogCustomer);

        this.customerService.updateCustomer(this.resultDialogCustomer).subscribe(
          (res) => {
             const toUpdate = this.customers.find(item=>item.id===res.id);
             const idx = this.customers.indexOf(toUpdate);
             this.customers[idx] = res; alert(JSON.stringify('Updated Successfully'));
          },
          (err) => { console.log(err) });

      }
    });
  }

  public getAllCoupons(): void {
    this.customerService.getAllCoupons().subscribe(
      (res) => { this.dialog.open(CouponsDialogComponent, {data: {coupons: res}});},
      (err) => { alert(err.error); });
  }

  FilterCoupons() {
    let filteredCoupons = this.customerCoupons;
    console.log('category', this.category);

    if (this.category) {
      filteredCoupons = filteredCoupons.filter((coupon) => {console.log('coupon', coupon);
       // tslint:disable-next-line:align
       return coupon.category === this.category; });
    }
    if (this.maxPrice) {
      filteredCoupons = filteredCoupons.filter((coupon) => coupon.price <= this.maxPrice);
    }
    this.coupons = filteredCoupons;
  }
}
