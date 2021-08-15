import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EBDialogData } from "src/app/models/eb-dialog/eb-dialog-data.model";

// https://material.angular.io/components/dialog
@Component({
  selector: 'eb-dialog',
  templateUrl: './expenses-builder-dialog.component.html',
})
export class ExpensesBuilderDialogComponent
  implements OnInit {
  dData: EBDialogData = {};

  constructor(
    public dialogRef: MatDialogRef<ExpensesBuilderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dInjectedData: EBDialogData
  ) { }

  ngOnInit() {
    this.initTemplateText(this.dInjectedData);
  }

  onCloseDialog() {
    this.dialogRef.close();
  }

  private initTemplateText(dInjectedData: EBDialogData) {
    this.dData = dInjectedData;
  }
}
