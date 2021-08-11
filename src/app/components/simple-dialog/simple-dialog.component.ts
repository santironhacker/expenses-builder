import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SimpleDialogData } from "src/app/models/simple-dialog-data.model";

// https://material.angular.io/components/dialog
@Component({
  selector: 'eb-simple-dialog',
  templateUrl: './simple-dialog.component.html',
})
export class SimpleDialog
  implements OnInit {
  dTitle: string = '';
  dContent: string = '';
  dCloseBtn: string = 'Close';

  constructor(
    public dialogRef: MatDialogRef<SimpleDialog>,
    @Inject(MAT_DIALOG_DATA) public dData: SimpleDialogData
  ) { }

  ngOnInit() {
    this.initTemplateText(this.dData);
  }

  onCloseDialog() {
    this.dialogRef.close();
  }

  private initTemplateText(dData: SimpleDialogData) {
    if (this.dData.title) this.dTitle = this.dData.title;
    if (this.dData.content) this.dContent = this.dData.content;
    if (this.dData.closeBtn) this.dCloseBtn = this.dData.closeBtn;
  }
}
