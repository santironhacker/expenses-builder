import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EbDialogClosingResults } from "src/app/models/eb-dialog/eb-dialog-closing-results";
import { EBDialogData } from "src/app/models/eb-dialog/eb-dialog-data.model";
import { FormTableContentComponent } from "./form-table-content/form-table-content.component";

// https://material.angular.io/components/dialog
@Component({
  selector: 'eb-dialog',
  templateUrl: './expenses-builder-dialog.component.html',
})
export class ExpensesBuilderDialogComponent
  implements OnInit {
  dData!: EBDialogData;

  @ViewChild(FormTableContentComponent)
  formTableContentComponent!: FormTableContentComponent

  constructor(
    public dialogRef: MatDialogRef<ExpensesBuilderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dInjectedData: EBDialogData
  ) { }

  ngOnInit() {
    this.initTemplateText(this.dInjectedData);
  }

  onUpdatedFormField(args: { rowIndex: number, field: string, value: string | number }) {
    if (this.dData.content.formTable?.dataSource) {
      this.dData.content.formTable.dataSource = this.dData.content.formTable?.dataSource.map((e, i) => {
        if (args.rowIndex === i) {
          return {
            ...e,
            [args.field]: args.value
          };
        }
        return e;
      });
    }
  }

  onCloseDialog() {
    const closingResults: EbDialogClosingResults = {
      isConfirmAction: false,
    };
    this.dialogRef.close(closingResults);
  }

  onConfirmDialog() {
    const closingResults: EbDialogClosingResults = this.buildConfirmDialogClosingResults();
    this.dialogRef.close(closingResults);
  }

  private initTemplateText(dInjectedData: EBDialogData) {
    this.dData = dInjectedData;
  }

  private buildConfirmDialogClosingResults(): EbDialogClosingResults {
    const closingResults: EbDialogClosingResults = {
      isConfirmAction: true,
      result: {}
    };
    if (this.dData.content.formTable?.dataSource) {
      closingResults.result!.dataSource = this.dData.content.formTable.dataSource;
    }
    return closingResults;
  }
}
