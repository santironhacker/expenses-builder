import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EbDialogClosingResults } from "src/app/models/eb-dialog/eb-dialog-closing-results";
import { EBDialogData } from "src/app/models/eb-dialog/eb-dialog-data.model";

// https://material.angular.io/components/dialog
@Component({
  selector: 'eb-dialog',
  templateUrl: './expenses-builder-dialog.component.html',
})
export class ExpensesBuilderDialogComponent
  implements OnInit {
  dData!: EBDialogData;

  constructor(
    public dialogRef: MatDialogRef<ExpensesBuilderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dInjectedData: EBDialogData
  ) { }

  ngOnInit() {
    this.initTemplateText(this.dInjectedData);
  }

  onCloseDialog() {
    const closingResults: EbDialogClosingResults = {
      isConfirmAction: false,
    };
    this.dialogRef.close(closingResults);
  }

  onConfirmDialog() {
    console.log('output results', this.dInjectedData.content.formTable.validatedColumns);
    console.log('datasource', this.dInjectedData.content.formTable.dataSource);
    console.log('displayedColumns', this.dInjectedData.content.formTable.displayedColumns);
    const closingResults: EbDialogClosingResults = {
      isConfirmAction: true,
    };
    this.dialogRef.close(closingResults);
  }

  private initTemplateText(dInjectedData: EBDialogData) {
    this.dData = dInjectedData;
  }
}
