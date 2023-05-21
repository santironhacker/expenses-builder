import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
"@angular/core";

@Component({
  selector: 'eb-form-table-content',
  templateUrl: './form-table-content.component.html',
  styleUrls: ['./form-table-content.component.scss']
})
export class FormTableContentComponent implements OnInit {
  @Input() dataSource: Array<any> | undefined = [];
  @Input() displayedColumns: Array<string> | undefined = [];
  @Output() updatedField: EventEmitter<{ rowIndex: number, field: string, value: string | number }> = new EventEmitter();
  formArray!: FormArray;

  ngOnInit() {
    if (!this.dataSource && this.displayedColumns) {
      this.dataSource = this.buildDataSourceFromHeadersArray(this.displayedColumns);
    }
    const formGroups = this.buildFormGroupsFromDataSource(this.dataSource!);
    this.formArray = new FormArray(
      formGroups,
      { updateOn: "blur" }
    );
  }

  /**
    * When no dataSource is passed to the component, assume the table will contain a single row of data to identical to the headers
    * @param headers
    */
  private buildDataSourceFromHeadersArray(headers: string[]): object[] {
    const dataSource = [];
    const rowData = {};
    headers.forEach(head => {
      const rowDataEl = { [head]: head };
      Object.assign(rowData, rowDataEl);
    })
    dataSource.push(rowData);
    return dataSource;
  }

  /**
    * Builds an array of FormGroup based on the dataSource array provided
    * @param dataSource
    */
  private buildFormGroupsFromDataSource(dataSource: object[]): FormGroup[] {
    const formsGroup: FormGroup[] = [];
    dataSource.forEach((rowData) => {
      formsGroup.push(this.buildFormGroupFromRowData(rowData))
    });
    return formsGroup;
  }

  /**
    * Builds individual FormGroup element containing FormControls based on the rowData object provided
    * @param dataSource
    */
  private buildFormGroupFromRowData(rowData: object): FormGroup {
    const formGroup = new FormGroup({});
    const keys = Object.keys(rowData);
    keys.forEach((key: string) => {
      formGroup.addControl(key, new FormControl(key, { validators: Validators.required }))
    });
    return formGroup;
  }

  /**
    * Returns the corresponding FormControl inside the whole FormArray
    * @param rowIndex
    * @param colName
    */
  getControl(rowIndex: number, colName: string): FormControl {
    return this.formArray.at(rowIndex).get(colName) as FormControl;
  }

  /**
    * Returns the corresponding FormControl inside the whole FormArray
    * @param rowIndex
    * @param colName
    */
  /* updateField(rowIndex: number, field: string) {
    const control = this.getControl(rowIndex, field);
    if (control.valid) {
      this.dataSource = this.dataSource.map((e, i) => {
        if (rowIndex === i) {
          return {
            ...e,
            [field]: control.value
          };
        }
        return e;
      });
    }
  } */

  onUpdateField(rowIndex: number, field: string) {
    const control = this.getControl(rowIndex, field);
    if (control.valid) {
      this.updatedField.emit({ rowIndex, field, value: control.value });
    }
  }
}
