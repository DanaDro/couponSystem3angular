import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  action: string;
}

@Component({
  selector: 'app-checking-dialog',
  templateUrl: './checking-dialog.component.html',
  styleUrls: ['./checking-dialog.component.css']
})
export class CheckingDialogComponent implements OnInit {
  @Input()
  action: string;

  constructor(public dialogRef: MatDialogRef<CheckingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      this.action = data.action;
    }

  ngOnInit(): void {
  }

}
