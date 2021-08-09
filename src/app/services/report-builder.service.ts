import { Injectable } from '@angular/core';
import * as Papa from 'papaparse';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportBuilderService {
  private processedFileResult = new Subject<Papa.ParseResult<object>>();

  public processedFile$ = this.processedFileResult.asObservable();

  constructor() { }

  getExpensesReport(file: File) {
    console.log('Creating report for file ', file.name);
    let reader: FileReader = new FileReader();

    Papa.parse(file, {
      // worker: true,
      header: true,
      skipEmptyLines: 'greedy',
      transform: function (value, header) {
        console.log('header-value', header);
        return value;
      },
      /* step: function(row) {
        console.log("Row:", row.data);
      }, */
      complete: (results: Papa.ParseResult<object>, file: File) => {
        console.log("Parsing complete:", results, file);
        this.processedFileResult.next(results);
      }
    });

    this.processedFile$.subscribe(
      (csvParser: Papa.ParseResult<object>) => {
        this.downloadCSVFromJson('usersClone.csv', csvParser);
      }
    )
  }

  downloadCSVFromJson(filename: string, csvParserResult: Papa.ParseResult<object>) {
    // convert JSON to CSV
    const arrayOfJson: object[] = csvParserResult.data;
    const headers = csvParserResult.meta.fields;

    const csv = Papa.unparse({
      "fields": headers ? headers : [undefined],
      "data": arrayOfJson
    }, {});

    // Create link and download
    var link = document.createElement('a');
    link.setAttribute('href', 'data:text/csv;charset=utf-8,%EF%BB%BF' + encodeURIComponent(csv));
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
}
