import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { CompanyService } from 'src/app/services/company.service';
import { CustomerService } from 'src/app/services/customer.service';
import { LoginDetails } from './model';

export interface DialogData {

}

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent implements OnInit {
  public loginDetails: LoginDetails = new LoginDetails();

  constructor(public dialogRef: MatDialogRef<LoginDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private router: Router, private adminService: AdminService, private companyService: CompanyService, private customerService: CustomerService) {
      this.loginDetails.type = "";
    }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    switch (this.loginDetails.type) {
      case 'Admin':
        this.adminService.loginAdmin(this.loginDetails.email, this.loginDetails.password).subscribe(
          (suc) => {
            this.adminService.setToken(suc.token);
            this.router.navigate(['/' + this.loginDetails.type.toLowerCase()]); },
          (err) => { alert(err.error); }
        )
        break;
      case 'Company':
        this.companyService.loginCompany(this.loginDetails.email, this.loginDetails.password).subscribe(
          (suc) => {
            this.companyService.setToken(suc.token);
            this.companyService.getCompanyDetails().subscribe(
              (res) => {
                this.companyService.setCompany(res);
                this.router.navigate(['/' + this.loginDetails.type.toLowerCase()]);
              },
              (err) => { console.log(err) });
          },
          (err) => { alert(err.error); }
        )
        break;
      case 'Customer':
        this.customerService.loginCustomer(this.loginDetails.email, this.loginDetails.password).subscribe(
          (suc) => {
            this.customerService.setToken(suc.token);
            this.customerService.getCustomerDetails().subscribe(
              (res) => {
                this.customerService.setCustomer(res);
                this.router.navigate(['/' + this.loginDetails.type.toLowerCase()]);
              },
              (err) => { console.log(err) });
          },
          (err) => { alert(err.error); }
        )
        break;

      default:
        break;
    }
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

}
