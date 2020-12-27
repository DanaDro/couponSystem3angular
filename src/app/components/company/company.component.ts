import { Coupon } from '../../models/Coupon';
import { CompanyService } from './../../services/company.service';
import { Company } from '../../models/Company';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateOrUpdateCouponComponent } from '../create-or-update-coupon/create-or-update-coupon.component';
import { CreateOrUpdateDialogCompanyComponent } from '../create-or-update-dialog-company/create-or-update-dialog-company.component';
import { CheckingDialogComponent } from '../checking-dialog/checking-dialog.component';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  public companies: Company[];
  public coupons: Coupon[];
  public company: Company;
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
  public companyCoupons: Coupon[];

  public resultDialogCoupon: Coupon;
  resultDialogCompany: any;

  constructor(private companyService : CompanyService, public dialog: MatDialog) { }

  ngOnInit(): void {

    this.name = this.companyService.company.name;

    this.companyService.getAllCoupons().subscribe(
      (res) => { this.companyCoupons = res;  this.coupons = this.companyCoupons; },
      (err) => { alert(err.error); });
  }

  public deleteCoupon(coupon: Coupon): void {
    this.openDeleteDialog(coupon);
  }

  public addCoupon(coupon: Coupon): void {
    this.openDialogCoupon(null);
  }
  public updateCoupon(coupon: Coupon): void {
     this.openDialogCoupon(coupon);
  }

  public getOneCoupon(coupon: Coupon): void {
    this.companyService.getOneCoupon(coupon.id).subscribe(
      () => { this.coupons.filter(item => item.id === coupon.id); },
      (err) => { alert(err.message); });
  }

  public openDialogCoupon(coupon: Coupon): void {

    let type: string;
    if (coupon) {
      type = 'Update';
    } else {
      type = 'Create';
    }
    const dialogRef = this.dialog.open(CreateOrUpdateCouponComponent, {
      width: '290px',
      data: { coupon, type }
    });

    dialogRef.afterClosed().subscribe(result => {
      // if(!result){
      //   return;
      // }
      this.resultDialogCoupon = result;

      if (type === 'Update') {
        console.log(this.resultDialogCoupon);

        this.companyService.updateCoupon(this.resultDialogCoupon).subscribe(
          (res) => {
            console.log(res);
             const toUpdate = this.coupons.find(item=>item.id===res.id);
             const idx = this.coupons.indexOf(toUpdate);
             this.coupons[idx] = res; alert('Updated Successfully');
          },
          (err) => { console.log(err) });

      } else {
        this.companyService.addCoupon(this.resultDialogCoupon).subscribe(
          (res) => {this.coupons.push(res); alert('Added Successfully'); },
          (err) => (err) => { alert('Customer is Already Exist' ); });
      }
    });
  }

  public openDeleteDialog(coupon: Coupon) {
    const dialogRef = this.dialog.open(CheckingDialogComponent, {data: {action: 'Delete'}});
    dialogRef.afterClosed().subscribe(
      (res) => {if(res){
        this.companyService.deleteCoupon(coupon.id).subscribe(
          () => { this.coupons = this.coupons.filter(item => item.id !== coupon.id); },
          (err) => { alert(err.message); });
      }})
  }

  FilterCoupons() {
    let filteredCoupons = this.companyCoupons;
    console.log('category', this.category);

    if (this.category) {
      filteredCoupons = filteredCoupons.filter((coupon) => {console.log('coupon', coupon);
       return coupon.category === this.category; });
    }
    if (this.maxPrice) {
      filteredCoupons = filteredCoupons.filter((coupon) => coupon.price <= this.maxPrice);
    }
    this.coupons = filteredCoupons;
  }

 }
