import { Company } from '../../models/Company';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  company: Company;
  type: string;
}

@Component({
  selector: 'app-create-or-update-dialog-company',
  templateUrl: './create-or-update-dialog-company.component.html',
  styleUrls: ['./create-or-update-dialog-company.component.css']
})
export class CreateOrUpdateDialogCompanyComponent implements OnInit {

  type: string;
  company = new Company();
  origin = new Company();

  ngOnInit(): void {
  }

  constructor(public dialogRef: MatDialogRef<CreateOrUpdateDialogCompanyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      console.log(data);
    this.smartCopy(data.company);
    this.type = data.type;
  }



  public smartCopy(company: Company): void {
    if (company) {
      this.company.id = company.id;
      this.company.name = company.name;
      this.company.email = company.email;
      this.company.password = company.password;
      this.company.coupons = company.coupons;

      this.origin.id = this.company.id;
      this.origin.name = this.company.name;
      this.origin.email = this.company.email;
      this.origin.password = this.company.password;
      this.origin.coupons = this.company.coupons;

    } else {
      this.company.id = 0;
      this.company.name = '';
      this.company.email = '';
      this.company.password = '';
      this.company.coupons = [];
    }
  }

  public checkChanges(origin: Company, company: Company): boolean {
    return JSON.stringify(origin) === JSON.stringify(company);
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

}
