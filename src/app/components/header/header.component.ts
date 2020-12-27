import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { CompanyService } from 'src/app/services/company.service';
import { CustomerService } from 'src/app/services/customer.service';
import { CheckingDialogComponent } from '../checking-dialog/checking-dialog.component';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { LoginDetails } from '../login-dialog/model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public loginDetails: LoginDetails = new LoginDetails();
  date: Date;
  constructor(private customerService: CustomerService, private companyService: CompanyService, private adminService: AdminService, public dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.date = new Date();
  }

  public onLogoutClick() {
    this.openCheckingDialog();
  }

  public isLoggedIn(): boolean {
    if (this.customerService.customer) {
      return true;
    }
    if (this.adminService.token) {
      return true;
    }
    if (this.companyService.company) {
      return true;
    }
  }

  public whosLogin() {
    if (this.customerService.customer) {
      return this.router.navigate(['/customer'] );
    }
    if (this.adminService.token) {
      return this.router.navigate(['/admin'] );
    }
    if (this.companyService.company) {
      return this.router.navigate(['/company'] );
    }

  }

  public openCheckingDialog() {
    const dialogRef = this.dialog.open(CheckingDialogComponent, { data: { action: 'Logout' } });
    dialogRef.afterClosed().subscribe(
      (res) => {
        if (res) {
          this.customerService.forgetCustomer();
          this.customerService.forgetToken();
          this.companyService.forgetCompany();
          this.companyService.forgetToken();
          this.adminService.forgetToken();
          this.deleteToken();
          this.router.navigate(['/'])
        }

      },
      (err) => { alert(err.message); });

  }

  public deleteToken(){
    if (this.customerService.customer) {
      this.customerService.logout().subscribe(
        (res) => {},
        (err) => {alert(err.message);}
        )
    }
    if (this.adminService.token) {
      this.adminService.logout().subscribe(
        (res) => {},
        (err) => {alert(err.message);}
        )
    }
    if (this.companyService.company) {
      this.companyService.logout().subscribe(
        (res) => {},
        (err) => {alert(err.message);}
        )
    }
  }

  public openLoginDialog() {
    const dialogRef = this.dialog.open(LoginDialogComponent);
    dialogRef.afterClosed().subscribe(
      (res) => {
        if (res) {
          switch (this.loginDetails.type) {
            case 'Admin':
              this.adminService.loginAdmin(this.loginDetails.email, this.loginDetails.password).subscribe(
                (suc) => {
                  this.adminService.setToken(suc.token);
                  this.router.navigate(['/' + this.loginDetails.type.toLowerCase()]);
                },
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
        (err) => { alert(err.message); }
      });
  }
}


