import { Injectable } from '@angular/core';
import * as Papa from 'papaparse';
import { Observable, Subject } from 'rxjs';
import { ProcessedFile } from '../models/processed-file.model';
import { UploadedFile } from '../models/uploaded-file.model';

@Injectable({
  providedIn: 'root'
})
export class ReportBuilderService {
  private processedFiles: ProcessedFile[] = [];

  private currentProcessedFileSource = new Subject<ProcessedFile>();

  public currentProcessedFile$ = this.currentProcessedFileSource.asObservable();

  constructor() { }

  getExpensesReport(uploadedFile: UploadedFile): Observable<ProcessedFile> {
    console.log('Creating report for file ', uploadedFile.file.name);

    Papa.parse(uploadedFile.file, {
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
        const newProcessedFile: ProcessedFile = {
          uploadedFileId: uploadedFile.id,
          papaParseResult: results
        }
        this.processedFiles.push(newProcessedFile);
        this.currentProcessedFileSource.next(newProcessedFile);
      }
    });

    return this.currentProcessedFile$;
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
