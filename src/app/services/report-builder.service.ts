import { Injectable } from '@angular/core';
import * as Papa from 'papaparse';

@Injectable({
  providedIn: 'root'
})
export class ReportBuilderService {

  constructor() { }

  getExpensesReport(file: File) {
    console.log('Creating report for file ', file.name);
    let reader: FileReader = new FileReader();

    Papa.parse(file, {
      // worker: true,
      header: true,
      skipEmptyLines: 'greedy',
      transform: function(value, header) {
        console.log('header-value', header);
        return value;
      },
      /* step: function(row) {
        console.log("Row:", row.data);
      }, */
      complete: function(results: any) {
        console.log(results);
      }
    });
  }
}
