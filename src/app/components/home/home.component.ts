import { Component, OnInit } from '@angular/core';
import { Coupon } from 'src/app/models/Coupon';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  date : Date;
  coupons: Coupon[];

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.date = new Date();
    this.customerService.getAllCoupons().subscribe(
      (res) => { this.coupons = res; },
      (err) => { alert(err.error); });
  }

}
