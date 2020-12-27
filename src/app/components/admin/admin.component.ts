import { Company } from '../../models/Company';
import { Component, OnInit } from '@angular/core';
import { Customer } from '../../models/Customer';
import { AdminService } from 'src/app/services/admin.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateOrUpdateDialogCustomerComponent } from '../create-or-update-dialog-customer/create-or-update-dialog-customer.component';
import { CreateOrUpdateDialogCompanyComponent } from '../create-or-update-dialog-company/create-or-update-dialog-company.component';
import { CouponsDialogComponent } from '../coupons-dialog/coupons-dialog.component';
import { Coupon } from 'src/app/Models/Coupon';
import {CheckingDialogComponent} from '../checking-dialog/checking-dialog.component'

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  public customers: Customer[];
  public companies: Company[];
  public company: Company;
  public id: number;
  public resultDialogCustomer: Customer;
  public resultDialogCompany: Company;

  constructor(private adminService: AdminService, public dialog: MatDialog) { }

  ngOnInit(): void {

    this.adminService.getAllCustomers().subscribe(
      (res) => { this.customers = res; },
      (err) => { alert(err.error); });

    this.adminService.getAllCompanies().subscribe(
      (res) => { this.companies = res; },
      (err) => { alert(err.error); });

  }

  public deleteCustomer(customer: Customer): void {
    this.openDeleteCustomerDialog(customer);
  }

  public deleteCompany(company: Company): void {
    this.openDeleteCompanyDialog(company);
  }

  public addCustomer(customer: Customer): void {
    this.openDialogCustomer(null);
  }
  public updateCustomer(customer: Customer): void {
     this.openDialogCustomer(customer);
  }

  public addCompany(company: Company): void {
    this.openDialogCompany(null);
  }
  public updateCompany(company: Company): void {
    this.openDialogCompany(company);
  }

  public getOneCompany(company: Company): void {
    this.adminService.getOneCompany(company.id).subscribe(
      () => { this.companies.filter(item => item.id === company.id); },
      (err) => { alert(err.message); });
  }

  public getOneCustomer(customer: Customer): void {
    this.adminService.getOneCustomer(customer.id).subscribe(
      () => { this.customers.filter(item => item.id === customer.id); },
      (err) => { alert(err.message); });
  }

  public openDialogCustomer(customer: Customer): void {

    let type: string;
    if (customer) {
      type = 'Update';
    } else {
      type = 'Create';
    }
    const dialogRef = this.dialog.open(CreateOrUpdateDialogCustomerComponent, {
      width: '290px',
      data: { customer, type }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(!result){
        return;
      }
      this.resultDialogCompany = result;

      if (type === 'Update') {
        console.log(this.resultDialogCustomer);

        this.adminService.updateCustomer(this.resultDialogCustomer).subscribe(
          (res) => {
             const toUpdate = this.customers.find(item=>item.id===res.id);
             const idx = this.customers.indexOf(toUpdate);
             this.customers[idx] = res; alert('Updated Successfully');},
          (err) => { console.log(err);});

      } else {
        this.adminService.addCustomer(this.resultDialogCustomer).subscribe(
          (res) => { this.customers.push(res); alert('Added Successfully'); },
          (err) => {alert('Customer is Already Exist');  });
      }

    });
  }

  public openDialogCompany(company: Company): void {

    let type: string;
    if (company) {
      type = 'Update';
    } else {
      type = 'Create';
    }
    const dialogRef = this.dialog.open(CreateOrUpdateDialogCompanyComponent, {
      width: '290px',
      data: { company, type }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(!result){
        return;
      }
      this.resultDialogCompany = result;

      if (type === 'Update') {
        console.log(this.resultDialogCompany);

        this.adminService.updateCompany(this.resultDialogCompany).subscribe(
          (res) => {
             const toUpdate = this.companies.find(item=>item.id===res.id);
             const idx = this.companies.indexOf(toUpdate);
             this.companies[idx] = res; alert('Updated Successfully');
          },


          (err) => { console.log(err); });

      } else {
        this.adminService.addCompany(this.resultDialogCompany).subscribe(
          (res) => { this.companies.push(res); alert('Added Successfully'); },
          (err) => { alert('Company is Already Exist' ); });
      }

    });
  }

  public openDeleteCustomerDialog(customer: Customer) {
    const dialogRef = this.dialog.open(CheckingDialogComponent, {data: {action: 'Delete'}});
    dialogRef.afterClosed().subscribe(
      (res) => {if(res){
        this.adminService.deleteCustomer(customer.id).subscribe(
      () => { this.customers = this.customers.filter(item => item.id !== customer.id); },
      (err) => { alert(err.message); });
      }})
  }

  public openDeleteCompanyDialog(company: Company) {
    const dialogRef = this.dialog.open(CheckingDialogComponent, {data: {action: 'Delete'}});
    dialogRef.afterClosed().subscribe(
      (res) => {if(res){
        this.adminService.deleteCompany(company.id).subscribe(
          () => { this.companies = this.companies.filter(item => item.id !== company.id); },
          (err) => { alert(err.message); });
      }})
  }

  public viewCoupons(coupons: Coupon[]) {
    this.dialog.open(CouponsDialogComponent, {data: {coupons}});
  }
}
